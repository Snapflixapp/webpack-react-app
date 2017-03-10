import React from 'react'
import styles from './VideoEntry.css'

const VideoEntry = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.video}>
        <video style={{width: '100%', height: '60%'}}>
          <source src={props.video.url} type='video/webm' />
        </video>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          {props.video.title}
        </div>
      </div>
    </div>
  )
}

export default VideoEntry
