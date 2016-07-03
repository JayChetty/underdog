const predictions = ( state = [], action ) => {

  switch( action.type ) {

    case 'GET_GAMES':
      return []
      // return state.concat( fixtures );
    default:
      return state;

  }

}

export default predictions;
