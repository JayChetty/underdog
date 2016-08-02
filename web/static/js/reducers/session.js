
export default ( state = null, action ) => {

  switch( action.type ) {
    case 'ADD_SESSION':
      return Object.assign( {}, state, action.session )
    default:
      return state
  }

}
