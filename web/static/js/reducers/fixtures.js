const initialState = {
  isFetching: false,
  received: false,
  items: []
}

export default ( state = initialState, action ) => {

  switch ( action.type ) {
    case 'REQUEST_FIXTURES':
      return Object.assign( {}, state, { isFetching: true } )
    case 'RECEIVE_FIXTURES':
      return Object.assign( {}, state, { items: action.fixtures, received: true, isFetching: false } )
    default:
      return state;
  }


}
