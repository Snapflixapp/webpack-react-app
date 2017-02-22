import {combineReducers} from 'redux'
import user from './UserReducer'
import users from './UsersReducer'
import videos from './VideosReducer'

// combine all reducers
export default combineReducers({
  user,
  users,
  videos
})
