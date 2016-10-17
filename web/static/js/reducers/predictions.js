import _ from 'lodash';

const initialState = {
  isFetching: false,
  received: false,
  items: [],
  displayWeek: null
}

export default ( state = initialState, action ) => {

  switch( action.type ) {
    case 'SET_DISPLAY_WEEK':
      return Object.assign( {}, state, { displayWeekIndex: action.week } )
    case 'RECEIVE_PREDICTIONS':
      return Object.assign( {}, state, { items: action.predictions, isFetching: false, received: true } )
    case 'REQUEST_PREDICTIONS':
      return Object.assign( {}, state, { isFetching: true } )
    case 'ADD_PREDICTION':
      const existingPrediction = _.find( state.items, (prediction)=>{
        return prediction.fixture_id === action.prediction.fixture_id
      }) || {}
      const newPrediction = Object.assign( {}, existingPrediction, action.prediction )
      const filteredPredictions = state.items.filter( (prediction) =>{
        return prediction.fixture_id !== action.prediction.fixture_id
      })
      const newPredictions = filteredPredictions.concat( [ newPrediction ] )
      return Object.assign( {}, state, { items: newPredictions } )
    case 'REMOVE_PREDICTION':
      const predictionIndex = _.findIndex( state.items, (prediction)=>{
        return action.fixtureId === prediction.fixture_id
      });
      const predictionsBefore = state.items.slice(0, predictionIndex);
      const predictionsAfter = state.items.slice( predictionIndex + 1 );
      const predictionsWithRemovedPrediction = predictionsBefore.concat( predictionsAfter );
      return Object.assign( {}, state, { items: predictionsWithRemovedPrediction } )
    default:
      return state;
  }

}
