const actions = {

  setFixtures: ( fixtures ) => {
    return {
      type: "SET_FIXTURES",
      fixtures
    }
  },

  setTeams: ( teams ) => {
    return {
      type: "SET_TEAMS",
      teams
    }
  },

  getGames: () => {
    return {
      type: "GET_GAMES"
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

  addSession: (session) => {
    return{
      type: "ADD_SESSION",
      session
    }
  }

}

export default actions;
