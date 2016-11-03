const initialState = {
  groupId: null,
  body: null,
  userId: null,
  userName: null,
  isNotifying: false
}

export default( state = initialState, action ) => {

  switch( action.type ) {
    case "SHOW_NOTIFICATION":
      return Object.assign( {}, state, { userId: action.payload.user_id, groupId: action.payload.group_id, body: action.payload.body, userName: action.payload.user_name, isNotifying: true } )
    case "REMOVE_NOTIFICATION":
      return Object.assign( {}, state, { userId: null, groupId: null, body: null, userName: null, isNotifying: false } )
    default:
      return state
  }

}
