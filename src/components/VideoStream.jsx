import React, {Component} from 'react'
import styles from './VideoStream.css'

const VideoStream = (props) => (
  <div className={styles.main}>
    <video autoPlay='true' src={props.src} width={props.width} height={props.height} />
  </div>
)

export default VideoStream
