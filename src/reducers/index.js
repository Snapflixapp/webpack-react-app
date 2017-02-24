import {combineReducers} from 'redux'
import FakeVideoData from './FakeVideoData'

const allReducers = combineReducers({
  videoData: FakeVideoData
})

export default allReducers
