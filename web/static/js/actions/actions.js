import fetch from 'isomorphic-fetch'

const actions = {

  setFixtures: ( fixtures ) => {
    return {
      type: "SET_FIXTURES",
      fixtures
    }
  },

  setPredictions: ( predictions ) => {
    return {
      type: "SET_PREDICTIONS",
      predictions
    }
  },

  setTeams: ( teams ) => {
    return {
      type: "SET_TEAMS",
      teams
    }
  },

  getPredictions: () => {
    return ( dispatch, session ) => {

      fetch( "/api/predictions", {
          method: 'GET',
          headers: {
            "Authorization": session.jwt
          }
      }).then( ( res ) => {
        return res.json();
      }).then( ( predictions ) => {
        dispatch( actions.setPredictions( predictions.data ) )
      })
    }
  },

  getTeams: () => {
    return ( dispatch ) => {

      fetch( "/api/teams", {
        method: 'GET'
      }).then( ( res ) => {
        return res.json();
      }).then(( teams ) => {
        dispatch( actions.setTeams( teams.data ) )
      })

    }
  },

  getFixtures: () => {
    return ( dispatch ) => {

      fetch( "/api/seasons/1/fixtures", {
        method: 'GET'
      }).then( ( res ) => {
        return res.json();
      }).then( ( fixtures ) => {
        dispatch( actions.setFixtures( fixtures.data ) )
      })

    }
  },

  addPrediction: ( prediction ) => {
    return {
      type: "ADD_PREDICTION",
      prediction
    }
  },

  removePrediction: ( fixtureId ) => {
    return {
      type: "REMOVE_PREDICTION",
      fixtureId
    }
  },

  addSession: ( session ) => {
    return{
      type: "ADD_SESSION",
      session
    }
  }

}

export default actions;
