import React, { Component } from 'react'
// import Kairos from 'kairos-api'

// const client = new Kairos('7f0ac7e4', '84be0d7236ae0f1a91070d203e0f887b')

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

class SignUpObject extends Component {
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
  handlePicture () {
    let context = this
    setTimeout(function () {
      let video = context.refs.video
      let picture = context.refs.canvas
      let username = context.refs.username.value
      picture.getContext('2d')
      .drawImage(video, 0, 0)
      let imgData = picture.toDataURL('img/png')
      imgData = imgData.replace('data:image/png;base64,', '')
      let params = {
        image: imgData,
        subject_id: username,
        gallery_name: 'snapflix'
      }
      // client.enroll(params)
      // .then(function (data) {
      //   let opts = data.body.images[0].transaction
      //   // will redirect to upload or comment page on log in
      //   console.log('You were enrolled in ' + opts.gallery_name + ' with the username ' + opts.subject_id)
      // })
      // .catch(function (err) {
      //   console.log('there was an error', err)
      // })
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
        <video src={this.state.src} ref='video' width={this.state.width} height={this.state.height} autoPlay />
        <canvas ref='canvas' width={this.state.width} height={this.state.height} />
        <div>
          <input type='text' placeholder='username' ref='username' />
          <button onClick={this.handlePicture}>Signup with picture</button>
        </div>
      </div>
    )
  }
};
export default SignUpObject
