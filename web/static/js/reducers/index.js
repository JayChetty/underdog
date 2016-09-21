import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router';
import teams from './teams'
import fixtures from './fixtures'
import predictions from './predictions'
import session from './session'
import weeks from './weeks'

export default combineReducers({
  teams,
  predictions,
  session,
  fixtures,
  weeks,
  router: routerStateReducer
})
