import React, { Component } from 'react'
// import { connect } from 'react-redux'
import VideoEntry from './VideoEntry'
// import CommentForm from '../components/Comment'
import styles from './VideoProfile.css'
// import LikeVideo from '../components/LikeVideo'

class VideoProfile extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <div className={styles.container}>
        <div>
          <div>
            <VideoEntry video={this.props.activeVideo} />
          </div>
          <div>
            {/* <LikeVideo /> */}
            {/* <CommentForm {...this.props} /> */}
          </div>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     activeVideo: state.activeVideoReducer
//   }
// }
//
// export default connect(mapStateToProps)(VideoProfile)
export default VideoProfile
