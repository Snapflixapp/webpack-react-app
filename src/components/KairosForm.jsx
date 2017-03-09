import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import Kairos from 'kairos-api'
// import gql from 'graphql-tag'
// import { graphql } from 'react-apollo'
// import { signIn } from '../actions'
import Kairos from 'kairos-api'
const client = new Kairos('7f0ac7e4', '84be0d7236ae0f1a91070d203e0f887b')

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

class KairosForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      src: null,
      width: 500,
      height: 500
    }

    this.handleVideo = this.handleVideo.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handlePicture = this.handlePicture.bind(this)
    this.updateCanvas = this.updateCanvas.bind(this)
  }

  componentDidMount () {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true}, this.handleVideo, this.handleError)
    }
    this.updateCanvas()
  }

  handleVideo (stream) {
    this.setState({
      src: window.URL.createObjectURL(stream)
    })
  }

  handlePicture (e) {
    e.preventDefault()
    let context = this
    setTimeout(function () {
      let video = context.refs.video
      let picture = context.refs.canvas
      let username = context.refs.username.value

      if (username.length) {
        picture.getContext('2d').drawImage(video, 0, 0)
        let imgData = picture.toDataURL('img/png')
        imgData = imgData.replace('data:image/png;base64,', '')

        let params = {
          image: imgData,
          subject_id: username,
          gallery_name: 'snapflix'
        }

        client.enroll(params)
        .then(function (data) {
          console.log('!!!!!!!Success: ', data)
        })
        .catch(function (err) {
          console.log('there was an error', err)
        })
      } else {
        window.alert('username is required')
      }
    }, 2000)
  }

  updateCanvas () {
    const ctx = this.refs.canvas.getContext('2d')
    ctx.fillRect(0, 0, 100, 100)
  }

  handleError () {
    console.log('The browser cannot access the webcam')
  }

  render () {
    return (
      <div>
        <div>
          <video src={this.state.src} ref='video' style={{width: '500px', height: '500px'}} autoPlay />
          <canvas ref='canvas' style={{width: '500px', height: '500px'}} />
        </div>
      </div>
    )
  }
}

export default KairosForm
