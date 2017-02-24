import React, {Component} from 'react'
import styles from './VideoList.css'
import {connect} from 'react-redux'
import {VideoEntry} from './VideoEntry'

class VideoList extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    console.log(this.props)
    return (
      <div className={styles.title}>
        {this.props.videos.map((video, index) => (
          <VideoEntry key={index} video={video} />
        ))
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    videos: state.videoData
  }
}

export default connect(mapStateToProps)(VideoList)
