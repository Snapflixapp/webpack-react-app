import {combineReducers} from 'redux'
import FakeVideoData from './FakeVideoData'

export const allReducers = combineReducers({
  videoData: FakeVideoData
})
