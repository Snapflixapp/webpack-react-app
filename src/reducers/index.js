import {combineReducers} from 'redux'
import user from './UserReducer'
import users from './UsersReducer'
import videos from './VideoReducer'

// combine all reducers
export default combineReducers({
  user,
  users,
  videos
})
