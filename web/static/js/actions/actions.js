import fetch from 'isomorphic-fetch';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import initRender from '../app'
import { calcGameWeekIndex } from '../libs/undergod_game'

import {Socket} from "phoenix"

const actions = {

  addGroupMessage: ( message ) => {
    return {
      type: "ADD_GROUP_MESSAGE",
      message
    }
  },

  loginUser: ( email, password, redirect ) => {
    return function( dispatch ) {
      dispatch( actions.loginUserRequest() )

      return fetch( '/api/sessions', {
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
          actions.fetchData(dispatch, response.jwt)
          browserHistory.push(`/weeks/${redirect }`);
        } catch( e ) {
          console.log( 'e', e )
        }
      })

    }
  },

  loginUserSuccess: ( session ) => {
    localStorage.setItem('ud_session', JSON.stringify( session ) );
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

  getTeams: () => {
    return ( dispatch ) => {

      dispatch( actions.requestTeams() )

      fetch( "/api/teams", {
        method: 'GET'
      }).then( ( res ) => {
        return res.json();
      }).then(( teams ) => {
        dispatch( actions.receiveTeams( teams.data ) )
      })

    }
  },

  requestTeams: () => {
    return {
      type: "REQUEST_TEAMS"
    }
  },

  receiveTeams: ( teams ) => {
    return {
      type: "RECEIVE_TEAMS",
      teams
    }
  },

  getFixtures: () => {
    return ( dispatch ) => {
      dispatch( actions.requestFixtures() )
      fetch( "/api/seasons/1/fixtures", {
        method: 'GET'
      }).then( ( res ) => {
        return res.json();
      }).then( ( fixtures ) => {
        dispatch( actions.receiveFixtures( fixtures.data ) )
      })

    }
  },

  requestFixtures: () => {
    return {
      type: "REQUEST_FIXTURES"
    }
  },

  receiveFixtures: ( fixtures ) => {
    return {
      type: "RECEIVE_FIXTURES",
      fixtures
    }
  },

  getGroups: () => {

    return ( dispatch, session ) => {
      let socket = new Socket("/socket", {params: {guardian_token: session.token}})
      socket.connect()

      dispatch( actions.requestGroups() )
      fetch( "/api/groups", {
        method: 'GET',
        headers: {
          "Authorization": session.token
        }
      }).then( ( res ) => {
        return res.json();
      }).then( ( groups ) => {
        const groupsWithChannels = groups.data.map((group)=>{
          let channel = socket.channel(`group:${group.id}`, {})
          channel.join()
            .receive("ok", resp => { console.log("Joined successfully", resp) })
            .receive("error", resp => { console.log("Unable to join", resp) })
          channel.on("new_msg", payload => {
            console.log('payload', payload)
            dispatch( actions.addGroupMessage( payload ) )
          })
          return Object.assign({}, group, {channel} )
        })
        dispatch( actions.receiveGroups( groupsWithChannels ) )
      })

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

  getPredictions: () => {
    return ( dispatch, session ) => {

      dispatch( actions.requestPredictions() )
      fetch( "/api/predictions", {
          method: 'GET',
          headers: {
            "Authorization": session.token
          }
      }).then( ( res ) => {
        return res.json();
      }).then( ( predictions ) => {
        dispatch( actions.receivePredictions( predictions.data ) )
      })
    }
  },

  fetchData:( dispatch, token )=>{
    actions.getWeeks()( dispatch )
    // actions.getFixtures()(dispatch)
    // actions.getTeams()(dispatch)
    // console.log('fetching data', token)
    actions.getPredictions()(dispatch, { token: token })
    actions.getGroups()(dispatch, { token: token })
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
      fetch( "/api/predictions", {
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
      fetch( `/api/fixtures/${prediction.fixture_id }/delete_prediction`, {
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

  getWeeks: () => {

    return ( dispatch ) => {
      dispatch( actions.requestWeeks() )

      fetch( "/api/weeks", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          }
      }).then( ( res ) => {
        return res.json();
      }).then( ( weeks ) => {
        dispatch( actions.receiveWeeks( weeks.data ) )
        const gameWeekIndex = calcGameWeekIndex( weeks.data )
        dispatch( actions.setGameWeekIndex( gameWeekIndex ) )
        initRender( gameWeekIndex );
      })
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
