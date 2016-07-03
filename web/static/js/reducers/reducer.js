const initialState = {
  fixtures: [],
  teams: []
}

const predictions = ( state = initialState, action ) => {

  switch( action.type ) {
    case 'SET_FIXTURES':
      return Object.assign( {}, state, {fixtures: action.fixtures} )
    case 'SET_TEAMS':
      return Object.assign( {}, state, {teams: action.teams} )
    default:
      return state;
  }

}

export default predictions;
