import { combineReducers } from 'redux'
import videoData from './FakeVideoData'
import userReducer from './UserReducer'
import activeVideoReducer from './ActiveVideoReducer'

const allReducers = combineReducers({
  videoData,
  userReducer,
  activeVideoReducer
})

export default allReducers
