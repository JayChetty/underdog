const initialState = {
  isFetching: false,
  received: false,
  items: []
}

export default ( state = initialState, action ) => {

  switch ( action.type ) {
    case 'REQUEST_TEAMS':
      return Object.assign( {}, state, { isFetching: true } )
    case 'RECEIVE_TEAMS':
      return Object.assign( {}, state, { items: action.teams, received: true, isFetching: false } )
    default:
      return state;
  }


}
