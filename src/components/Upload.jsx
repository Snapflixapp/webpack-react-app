import React, {Component} from 'react'
import styles from './Upload.css'

import VideoStream from './VideoStream'
import Canvas from './Canvas'

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
navigator.msGetUserMedia || navigator.oGetUserMedia

export class Upload extends Component {
  constructor (props) {
    super(props)

    this.state = {
      src: null,
      width: 300,
      height: 300
    }

    this.handleVideo = this.handleVideo.bind(this)
    this.videoError = this.videoError.bind(this)
  }

  handleVideo (stream) {
    console.log('handlevideo function')
    this.setState({
      src: window.URL.createObjectURL(stream)
    })
  }

  videoError () {
    console.log('videoerror function')
  }

  componentDidMount () {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        video: true
      }, this.handleVideo, this.videoError)
    }
  }

  render () {
    return (
      <div className={styles.container}>
        Upload Page
        <VideoStream src={this.state.src} width={this.state.width} height={this.state.height} />
        <Canvas width={this.state.width} height={this.state.height} />
      </div>
    )
  }
}
