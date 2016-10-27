import _ from 'lodash';
import {List, Map} from "immutable"

const initialState = {
  isFetching: false,
  received: false,
  items: List(),
  displayWeekIndex: null,
  gameWeekIndex: null
}

export default ( state = initialState, action ) => {

  switch( action.type ) {
    case "SET_GAMEWEEK_INDEX":
      return Object.assign({}, state, { gameWeekIndex: action.index })
    case 'SET_DISPLAY_WEEK':
      return Object.assign( {}, state, { displayWeekIndex: action.week } )
    case 'RECEIVE_PREDICTIONS':
      return Object.assign( {}, state, { items: List(action.predictions), isFetching: false, received: true } )
    case 'REQUEST_PREDICTIONS':
      return Object.assign( {}, state, { isFetching: true } )
    case 'ADD_PREDICTION':
      const predictionExistsForFixture = state.items.some( (prediction)=>{
        return prediction.fixture_id === action.prediction.fixture_id
      })
      if(predictionExistsForFixture){
        return state
      }
      const updatedPredictions = state.items.push( action.prediction )
      return Object.assign( {}, state, { items: updatedPredictions } )

    case 'REMOVE_PREDICTION':
      const predictionIndex = state.items.findIndex( (prediction)=>{
        return action.fixtureId === prediction.fixture_id
      });
      return Object.assign( {}, state, { items: state.items.deleteIn([predictionIndex]) } )

    default:
      return state;
  }

}
