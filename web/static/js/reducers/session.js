export default ( state = null, action ) => {

  switch( action.type ) {
    case 'ADD_SESSION':
      return Object.assign( {}, state, action.session )
    case 'LOGIN_USER_REQUEST':
      return Object.assign( {}, state, {
        isAuthenticating: true,
        statusText: null
      } )
    default:
      return state
  }

}
