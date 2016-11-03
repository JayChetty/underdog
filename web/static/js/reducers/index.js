import { combineReducers } from 'redux'
import predictions from './predictions'
import session from './session'
import weeks from './weeks'
import groups from './groups'
import notify from './notify'

export default combineReducers({
  predictions,
  session,
  weeks,
  groups,
  notify
})
