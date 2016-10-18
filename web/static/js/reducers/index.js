import { combineReducers } from 'redux'
import teams from './teams'
import fixtures from './fixtures'
import predictions from './predictions'
import session from './session'
import weeks from './weeks'
import groups from './groups'

export default combineReducers({
  teams,
  predictions,
  session,
  fixtures,
  weeks,
  groups
})
