import React, { Component } from 'react'
import styles from './UploadForm.css'
import { captureUserMedia } from '../utils'
import VideoStream from './VideoStream'
import RecordRTC from 'recordrtc'

const hasGetUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

export default class UploadForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      src: null,
      stream: null,
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

  componentWillUnmount () {
    this.state.stream.stop()
  }

  handleTitle (e) {
    this.setState({
      title: e.target.value
    })
  }

  requestUserMedia () {
    console.log('requestUserMedia')
    captureUserMedia((stream) => {
      this.setState({
        src: window.URL.createObjectURL(stream),
        stream
      })
      console.log('setting state', this.state)
    })
  }

  startRecord () {
    console.log('Starting recording')
    this.state.recordVideo = RecordRTC(this.state.stream, { type: 'video' })
    this.state.recordVideo.startRecording()

    setTimeout(() => {
      console.log('Finished recording')
      // this.state.stream.getTracks().forEach(track => track.stop())
      this.state.stream.stop()
      this.stopRecord()
    }, 4000)
  }

  stopRecord () {
    this.state.recordVideo.stopRecording(() => {
      const video = {
        title: this.state.title,
        contentType: 'video/webm',
        data: this.state.recordVideo.blob
      }

      this.props.onSubmit(video)
      // let params = {
      //   type: 'video/webm',
      //   data: this.state.recordVideo.blob,
      //   title: this.state.title || 'Untitled'
      // }
      //
      // this.setState({ uploading: true })
      //
      // S3Upload(params)
      // .then(success => {
      //   console.log('S3 upload successful')
      //   this.setState({ uploadSuccess: true, uploading: false })
      // })
      // .catch(e => console.log(e))
    })
  }

  render () {
    return (

      <div>
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
