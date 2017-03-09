import React, { Component } from 'react'

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

class KairosSignUp extends Component {
  constructor (props) {
    super(props)
    console.log('Props: ', props)
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
    let video = this.refs.video
    let picture = this.refs.canvas
    let username = this.refs.username.value

    if (username.length) {
      this.props.handleKairos(username, video, picture)
    } else {
      window.alert('username is required')
    }
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
          <form>
            <input type='text' placeholder='username' ref='username' required />
            <button type='submit' onClick={this.handlePicture}>Signup with picture</button>
          </form>
        </div>
      </div>
    )
  }
}

export default KairosSignUp
