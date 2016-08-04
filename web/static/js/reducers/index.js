import { combineReducers } from 'redux'
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
  weeks
})
