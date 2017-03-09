import React, { Component } from 'react'
// import styles from './VideoStream.css'
// import RecordPage from './s3UploadPage'
export default class VideoStream extends Component {
  // constructor (props) {
  //   super(props)
  // }
  render () {
    return (

      <div>
        <video src={this.props.src} width={this.props.width} height={this.props.height} autoPlay />

      </div>
    )
  }
}
