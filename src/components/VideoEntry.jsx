import React, { Component } from 'react'
import styles from './VideoEntry.css'

class VideoEntry extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.video}>
          <video style={{width: '100%', height: '60%'}}> <source src={this.props.video.url} type='video/webm' /></video>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            {decodeURIComponent(this.props.video.title)}
          </div>
        </div>
      </div>
    )
  }
}

export default VideoEntry
