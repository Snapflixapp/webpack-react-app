import { combineReducers } from 'redux'
import videoData from './FakeVideoData'
import userReducer from './UserReducer'
import activeVideoReducer from './ActiveVideoReducer'

export default combineReducers({
  videoData,
  userReducer,
  activeVideoReducer
})
