import React, { Component } from 'react'
import { connect } from 'react-redux'
import VideoEntry from './VideoEntry'
import CommentForm from '../components/Comment'
import styles from './VideoProfile.css'

class VideoProfile extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <div className={styles.container}>
        {console.log('looking for props', this.props.activeVideo)}
        <div>
          <div>
            <VideoEntry video={this.props.activeVideo} />
          </div>
          <div>
            <CommentForm {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activeVideo: state.activeVideoReducer
  }
}

export default connect(mapStateToProps)(VideoProfile)
