import React, {Component} from 'react'
import {connect} from 'react-redux'
import VideoEntry from './VideoEntry'
import CommentForm from '../components/Comment'

class VideoProfile extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <div>
        {console.log('looking for props', this.props.activeVideo)}
        <VideoEntry video={this.props.activeVideo} />
        // <CommentForm {...this.props} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    activeVideo: state.activeVideoReducer
  }
}

export default connect(mapStateToProps)(VideoProfile)
