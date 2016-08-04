const initialState = {
  isFetching: false,
  received: false,
  items: []
}

export default ( state = initialState, action ) => {

  switch ( action.type ) {
    case 'REQUEST_WEEKS':
      return Object.assign( {}, state, { isFetching: true })
    case 'RECEIVE_WEEKS':
      return Object.assign( {}, state, { isFetching: false, received: true, items: action.weeks } )
    default:
      return state
  }

}
