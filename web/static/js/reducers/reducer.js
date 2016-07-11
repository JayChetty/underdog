import _ from 'lodash';

const initialState = {
  fixtures: [],
  teams: [],
  predictions: [],
  session: null
}

const predictions = ( state = initialState, action ) => {

  switch( action.type ) {
    case 'ADD_SESSION':
      return Object.assign( {}, state, { session: action.session } )
    case 'SET_FIXTURES':
      return Object.assign( {}, state, {fixtures: action.fixtures} )
    case 'SET_TEAMS':
      return Object.assign( {}, state, {teams: action.teams} )
    case 'ADD_PREDICTION':
      const existingPrediction = _.find( state.predictions, (prediction)=>{
        return prediction.fixture_id === action.prediction.fixture_id
      }) || {}
      const newPrediction = Object.assign( {}, existingPrediction, action.prediction )
      const filteredPredictions = state.predictions.filter( (prediction) =>{
        return prediction.fixture_id !== action.prediction.fixture_id
      })
      const newPredictions = filteredPredictions.concat( [ newPrediction ] )
      return Object.assign( {}, state, { predictions: newPredictions } )
    case 'REMOVE_PREDICTION':
      const predictionIndex = _.findIndex( state.predictions, (prediction)=>{
        return action.fixtureId === prediction.fixture_id
      });
      const predictionsBefore = state.predictions.slice(0, predictionIndex);
      const predictionsAfter = state.predictions.slice( predictionIndex + 1 );
      const predictionsWithRemovedPrediction = predictionsBefore.concat( predictionsAfter );
      return Object.assign( {}, state, { predictions: predictionsWithRemovedPrediction } )
    default:
      return state;
  }

}

export default predictions;
