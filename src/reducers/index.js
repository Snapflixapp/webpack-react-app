import {combineReducers} from 'redux'
import FakeVideoData from './FakeVideoData'
import UserReducer from './UserReducer'

const allReducers = combineReducers({
  videoData: FakeVideoData,
  userReducer: UserReducer
})

export default allReducers
