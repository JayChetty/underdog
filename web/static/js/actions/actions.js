import fetch from 'isomorphic-fetch'

const actions = {

  setDisplayWeek: ( week ) => {
    return {
      type: "SET_DISPLAY_WEEK",
      week
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

  getPredictions: () => {
    return ( dispatch, session ) => {

      dispatch( actions.requestPredictions() )

      fetch( "/api/predictions", {
          method: 'GET',
          headers: {
            "Authorization": session.jwt
          }
      }).then( ( res ) => {
        return res.json();
      }).then( ( predictions ) => {
        dispatch( actions.receivePredictions( predictions.data ) )
      })
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

      fetch( "/api/predictions", {
        method: "POST",
        body: JSON.stringify( prediction ),
        headers: {
          "Authorization": session.jwt
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
          method: 'GET'
      }).then( ( res ) => {
        return res.json();
      }).then( ( weeks ) => {
        dispatch( actions.receiveWeeks( weeks.data ) )
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


// predictionSelect(e) {
//   if (this.props.fixture.prediction) {
//     deleter( `api/predictions/${this.props.fixture.prediction.id}`, null, this.props.session )
//     this.props.dispatch( actions.removePrediction( this.props.fixture.id ) );
//     return;
//   }
//   const prediction = {
//     fixture_id: this.props.fixture.id,
//     type: 'upset'
//   }
//   this.props.dispatch( actions.addPrediction( prediction ) );
//
//   const predictionData = {
//     prediction: prediction
//   }
//   post( 'api/predictions', null, this.props.session, JSON.stringify(predictionData) )
// }
