import React, {Component} from 'react'
import styles from './VideoStream.css'

class VideoStream extends Component {
  constructor (props) {
    super(props)

    this.state = {
      videoCapture: {}
    }

    this.handlePlay = this.handlePlay.bind(this)
  }

  handlePlay () {
    console.log('handle play')
    this.refs.video.play()
  }

  render () {
    return (
      <div className={styles.main}>
        <video ref='video' autoPlay='true' src={this.props.src} width={this.props.width} height={this.props.height} />
        <button onClick={this.handlePlay}>Play</button>
      </div>
    )
  }
}

// const VideoStream = (props) => (
//   <div className={styles.main}>
//     <video autoPlay='true' src={props.src} width={props.width} height={props.height} />
//   </div>
// )

export default VideoStream
