import R from 'ramda'

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
    case "ADD_GROUP_MESSAGE":
      const newGroups = state.items.map( ( group ) => {
        if ( group.id === action.message.group_id ) {
          return Object.assign( {}, group, { messages: group.messages.concat( action.message ) } )
        } else {
          return group
        }
      })
      return Object.assign( {}, state, { items: newGroups } )
    default:
      return state;
  }


}
