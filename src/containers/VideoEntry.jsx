import React, { Component } from 'react'
import styles from './VideoEntry.css'

class VideoEntry extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.vid}>
          <iframe src={`https://www.youtube.com/embed/${this.props.video.id.videoId}`} allowFullScreen />
        </div>
        <div>
          <div>
            {this.props.video.snippet.title}
          </div>
          <div>
            {this.props.video.snippet.description}
          </div>
        </div>
      </div>
    )
  }
}

export default VideoEntry
