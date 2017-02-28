import React, { Component } from 'react'
import styles from './Upload.css'
import { captureUserMedia, S3Upload } from '../utils'
import VideoStream from './VideoStream'
import RecordRTC from 'recordrtc'
// navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
// navigator.msGetUserMedia || navigator.oGetUserMedia
const hasGetUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

export default class Upload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      src: null,
      width: 300,
      height: 300,
      uploadSuccess: null,
      uploading: false,
      recordVideo: null,
      title: ''
    }

    this.requestUserMedia = this.requestUserMedia.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.startRecord = this.startRecord.bind(this)
    this.stopRecord = this.stopRecord.bind(this)
  }

  componentDidMount () {
    if (!hasGetUserMedia) {
      console.log('Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.')
      return
    }
    this.requestUserMedia()
  }

  handleTitle (e) {
    this.setState({
      title: e.target.value
    })
  }

  requestUserMedia () {
    console.log('requestUserMedia')
    captureUserMedia((stream) => {
      this.setState({ src: window.URL.createObjectURL(stream) })
      console.log('setting state', this.state)
    })
  }

  startRecord () {
    captureUserMedia((stream) => {
      this.state.recordVideo = RecordRTC(stream, { type: 'video' })
      this.state.recordVideo.startRecording()
    })

    setTimeout(() => {
      this.stopRecord()
    }, 4000)
  }

  stopRecord () {
    this.state.recordVideo.stopRecording(() => {
      let params = {
        type: 'video/webm',
        data: this.state.recordVideo.blob,
        title: this.state.title || 'Untitled'
      }
      console.log(this.state)
      this.setState({ uploading: true })

      S3Upload(params)
      .then((success) => {
        console.log('enter then statement')
        if (success) {
          this.setState({ uploadSuccess: true, uploading: false })
        }
      }, (error) => {
        console.log(error, 'error occurred. check your aws settings and try again.')
      })
    })
  }

  render () {
    return (

      <div className={styles.main}>
        <VideoStream src={this.state.src} ref='video' width={this.state.width} height={this.state.height} />
        {this.state.uploading ? <div>Uploading...</div> : null}
        <br />
        <div><div>Title:</div><input type='text' className={styles.titleInput} onChange={this.handleTitle} /></div>
        <br />
        <div><button onClick={this.startRecord}>Start Record</button></div>
      </div>
    )
  }
}
