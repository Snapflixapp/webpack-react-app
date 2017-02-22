// combine all reducers
import {combineReducers} from 'redux'
import userReducer from './UserReducer'
import usersReducer from './UsersReducer'
import videosReducer from './VideosReducer'
import usersDataReducer from './UsersDataReducer'


// combine all reducers
const allReducers = combineReducers({
  user: userReducer,
  users: usersReducer,
  usersData: usersDataReducer,
  videos: videosReducer
})

export default allReducers
