const initialState = {
  isFetching: false,
  received: false,
  items: []
}

export default ( state = initialState, action ) => {

  switch ( action.type ) {
    case 'REQUEST_GROUPS':
      return Object.assign( {}, state, { isFetching: true } )
    case 'RECEIVE_GROUPS':
      return Object.assign( {}, state, { items: action.groups, received: true, isFetching: false } )
    default:
      return state;
  }


}
