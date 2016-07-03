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
  }

}

export default actions;
