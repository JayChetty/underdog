import fetch from 'isomorphic-fetch';
import jwtDecode from 'jwt-decode';
import { calcGameWeekIndex } from '../libs/undergod_game'
import { browserHistory } from "react-router"
import { initRender } from "../app"

import {connectToSocket, joinChannel} from "../socket"

let host = ""
if(window.isCordovaApp){
  // host = "http://localhost:4000"
  host = "https://guarded-hollows-82324.herokuapp.com"
}

function updateFCMToken(firebaseToken, session){
  const user = { firebase_token: firebaseToken }
  fetch( `${host}/api/users/${session.user.id}`, {
    method: "PUT",
    body: JSON.stringify( { user: user } ),
    headers: {
      "Content-Type": "application/json",
      "Authorization": session.jwt
    }
  })
  .then( response => console.log("Updated Token", response ) )
  .catch( err => { console.error( err ) } )
}


const actions = {

  showNotification: ( payload ) => {
    return {
      type: "SHOW_NOTIFICATION",
      payload
    }
  },

  removeNotification: () => {
    return {
      type: "REMOVE_NOTIFICATION"
    }
  },

  addGroupMessage: ( message ) => {
    return {
      type: "ADD_GROUP_MESSAGE",
      message
    }
  },


  signUpUser: ( name, email, password ) => {
    return function( dispatch ) {
      return fetch( `${host}/api/registrations`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            user: {
              name: name,
              email: email,
              password: password
            }
        })
      }).then( ( response ) => {
          console.log( "response", response )
          dispatch( actions.loginUser( email, password ) )
      })
    }
  },

  loginUser: ( email, password ) => {
    return function( dispatch ) {
      dispatch( actions.loginUserRequest() )

      return fetch( `${host}/api/sessions`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          session:{
            email: email,
            password: password
          }
        })
      }).then( (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response
        } else {
          var error = new Error(response.statusText)
          error.response = response
          throw error
        }
      }).then( ( response ) => {
        return response.json()
      }).then( ( response ) => {
        try {
          dispatch( actions.loginUserSuccess( response ) )
          actions.getGame()(dispatch, response.jwt, true)
        } catch( e ) {
          console.log( 'e', e )
        }
      })

    }
  },

  loginUserSuccess: ( session ) => {
    localStorage.setItem('ud_session', JSON.stringify( session ) );

    if(window.ServiceWorker){
      console.log("have service worker setting up messaging")
      const messaging = firebase.messaging()
      messaging.requestPermission()
      .then( ()=> {
        console.log("Have permission for firebase messaging")
        messaging.onTokenRefresh( ()=>{
          console.log('Token has refreshed')
          messaging.getToken()
          .then( (firebaseToken)=>{
            updateFCMToken(firebaseToken, session)
          })
          .catch( err => console.error("Error getting token", err))
        })
      })
      .catch(err => console.error("Error occured firebase messaging reg", err))

      messaging.onMessage(function(payload){
        console.log('Onmessage', payload)
      })
    } else if(window.isCordovaApp && FCMPlugin){
      // how to request permission her
      FCMPlugin.getToken(
        function(firebaseToken){
          console.log('cordova FCM got token', firebaseToken)
          updateFCMToken(firebaseToken, session)
          // FCMPlugin.subscribeToTopic('group_1');
        },
        function(err){
          console.log('cordova error retrieving token: ' + err);
        }
      )
    }

    return {
      type: "LOGIN_USER_SUCCESS",
      session
    }
  },

  loginUserRequest: () => {
    return {
      type: "LOGIN_USER_REQUEST"
    }
  },

  setDisplayWeek: ( week ) => {
    return {
      type: "SET_DISPLAY_WEEK",
      week
    }
  },

  setGameWeekIndex: ( index ) => {
    return {
      type: "SET_GAMEWEEK_INDEX",
      index
    }
  },

  requestGroups: () => {
    return {
      type: "REQUEST_GROUPS"
    }
  },

  receiveGroups: ( groups ) => {
    return {
      type: "RECEIVE_GROUPS",
      groups
    }
  },

  requestPredictions: () => {
    return {
      type: "REQUEST_PREDICTIONS"
    }
  },

  receivePredictions: ( predictions ) => {
    return {
      type: "RECEIVE_PREDICTIONS",
      predictions
    }
  },

  addPrediction: ( prediction ) => {
    return {
      type: "ADD_PREDICTION",
      prediction
    }
  },


  makePrediction: ( prediction ) => {
    return ( dispatch, session ) => {
      dispatch( actions.addPrediction( prediction ) )
      fetch( `${host}/api/predictions`, {
        method: "POST",
        body: JSON.stringify( { prediction: prediction } ),
        headers: {
          "Content-Type": "application/json",
          "Authorization": session.token
        }
      }).then( response => { console.log( response ) })
      .catch( err => { console.error( err ) } )
    }
  },

  deletePrediction: ( prediction ) => {
    return ( dispatch, session ) => {
      dispatch( actions.removePrediction( prediction.fixture_id ) )
      fetch( `${host}/api/fixtures/${prediction.fixture_id }/delete_prediction`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": session.token
        }
      }).then( response => { console.log( response ) })
      .catch( err => { console.error( err ) } )
    }
  },


  removePrediction: ( fixtureId ) => {
    return {
      type: "REMOVE_PREDICTION",
      fixtureId
    }
  },

  getGame: () => {
    return ( dispatch, token, userLoggingIn ) => {
      dispatch( actions.requestWeeks() )
      dispatch( actions.requestGroups() )
      dispatch( actions.requestPredictions() )

      let socket = connectToSocket(token)

      fetch( `${host}/api/games`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          }
      }).then( ( res ) => {
        return res.json();
      }).then( ( data ) => {
        dispatch( actions.receiveWeeks( data.weeks ) )
        const gameWeekIndex = calcGameWeekIndex( data.weeks )
        dispatch( actions.setGameWeekIndex( gameWeekIndex ) )
        dispatch( actions.receivePredictions( data.predictions ) )

        let channel = joinChannel(socket, "results")

        channel.on("new_results", payload => {
          dispatch( actions.updateFixturesInWeeks( gameWeekIndex, payload.fixtures ) )
        })

        const groupsWithChannels = data.groups.map((group)=>{
          let channel = joinChannel(socket, `group:${group.id}`)
          channel.on("new_msg", ( payload ) => {
            console.log( "got new message" )
            dispatch( actions.addGroupMessage( payload ) )
            console.log( payload );
            dispatch( actions.showNotification( payload ) );
            setTimeout( () => {
              dispatch( actions.removeNotification() );
            }, 4000 )
          })
          channel.on("member_added", ( payload ) => {
            console.log( "member_added", payload )
            // dispatch( actions.addGroupMessage( payload ) )
            // console.log( payload );
            dispatch( actions.showNotification( payload ) );
            setTimeout( () => {
              dispatch( actions.removeNotification() );
            }, 4000 )
          })
          return Object.assign({}, group, {channel} )
        })

        dispatch( actions.receiveGroups( groupsWithChannels ) )

        if ( userLoggingIn ) {
          browserHistory.push( `/weeks/${ gameWeekIndex }` )
        }
        initRender( gameWeekIndex );
      })
    }

  },

  updateFixturesInWeeks: ( gameWeekIndex, fixtures ) => {
    return {
      type: "UPDATE_FIXTURES_IN_WEEKS",
      gameWeekIndex,
      fixtures
    }
  },

  requestWeeks: () => {
    return {
      type: "REQUEST_WEEKS"
    }
  },

  receiveWeeks: ( weeks ) => {
    return {
      type: "RECEIVE_WEEKS",
      weeks
    }
  },

  addSession: ( session ) => {
    return {
      type: "ADD_SESSION",
      session
    }
  }

}

export default actions;
