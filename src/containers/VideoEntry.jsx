import React, { Component } from 'react'
import styles from './VideoEntry.css'

class VideoEntry extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.video}>
          <iframe src={`https://www.youtube.com/embed/${this.props.video.id.videoId}`} allowFullScreen />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            {this.props.video.snippet.title}
          </div>
          <div className={styles.description}>
            {this.props.video.snippet.description}
          </div>
        </div>
      </div>
    )
  }
}

export default VideoEntry
