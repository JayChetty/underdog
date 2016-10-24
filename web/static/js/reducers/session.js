export default ( state = null, action ) => {

  switch( action.type ) {
    case 'ADD_SESSION':
      return Object.assign( {}, state, action.session )
    case 'LOGIN_USER_REQUEST':
      return Object.assign( {}, state, {
        isAuthenticating: true,
        statusText: null
      })
    case 'LOGIN_USER_SUCCESS':
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.session.jwt,
        user: action.session.user,
        statusText: "Successfully logged in."
      })
    default:
      return state
  }

}
