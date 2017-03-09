import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { signIn } from '../actions'
import { registerKairos } from '../utils'

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

import styles from './SignUpContainer.css'

class SignUpContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      imageData: '',
      src: null,
      redirectToReferrer: false,
      width: 500,
      height: 500
    }

    this.handleVideo = this.handleVideo.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handlePicture = this.handlePicture.bind(this)
    // this.updateCanvas = this.updateCanvas.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  componentDidMount () {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true}, this.handleVideo, this.handleError)
    }
    // this.updateCanvas()
  }

  handleUsername (e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword (e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.refs.info.reset()
    if (this.state.username.length !== 0) {
      this.handlePicture()

      const newUserInfo = {
        username: this.state.username,
        password: this.state.password
      }

      this.props.signUpMutation({ variables: newUserInfo })
      .then((response) => {
        if (response.data.signUp.errors.length === 0) {
          this.props.signInDispatcher(response.data.signUp.token)

          const params = {
            image: this.state.imageData,
            subject_id: this.state.username,
            gallery_name: 'snapflix'
          }

          const context = this
          registerKairos(params)
          .then(function (data) {
            let yaye = data.body.images[0].transaction.status
            // console.log('from kairos....=>',data.body.images[0].transaction.status)
            if (yaye) {
              console.log('Done',yaye)
            context.setState({
              redirectToReferrer: true
            })
            }
          })
          .catch(function (err) {
            console.log('There was an error registering with Kairos', err)
          })
        } else {
          this.setState({
            errors: response.data.signUp.errors
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  handleVideo (stream) {
    this.setState({
      src: window.URL.createObjectURL(stream)
    })
  }

  handlePicture () {
    const video = this.refs.video
    const picture = this.refs.canvas
    picture.getContext('2d').drawImage(video, 0, 0)
    let imgData = picture.toDataURL('img/png')
    let imageData = imgData.replace('data:image/png;base64,', '')
    // console.log('Image data: ', imageData)
    this.setState({
      imageData: imageData
    })
  }

  // updateCanvas () {
  //   const ctx = this.refs.canvas.getContext('2d')
  //   ctx.fillRect(0, 0, 100, 100)
  // }

  handleError () {
    console.log('The browser cannot access the webcam')
  }

  render () {
    const redirectToReferrer = this.state.redirectToReferrer
    if (redirectToReferrer) {
      return (
        <Redirect to='/' />
      )
    }

    return (
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <form ref='info' onSubmit={this.handleSubmit}>
          <label>Username: </label>
          <br />
          <input className={styles.signUpInput} type='text' placeholder='Username' onChange={this.handleUsername} />
          <br />
          <label>Password: </label>
          <br />
          <input className={styles.signUpInput} type='password' placeholder='Password' onChange={this.handlePassword} />
          <br />
          <button className={styles.signUpButton} type='submit' onClick={this.handleSubmit}>Sign up</button>
          <br />
        </form>
        <div className={styles.kairosForm}>
          <div>
            <div>
              <video src={this.state.src} ref='video' style={{width: '300px', height: '300px'}} autoPlay />
              <canvas ref='canvas' width={this.state.width} height={this.state.height} />
            </div>
          </div>
        </div>
        <div>
          <Link to='/signin'>Already have an account? Sign in</Link>
        </div>
      </div>
    )
  }
}

const signUpMutation = gql`
  mutation signUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      token,
      errors
    }
  }
`

const kairosSignUpMutation = gql`
  mutation kairosSignIn($username: String!) {
    kairosSignIn(username: $username) {
      token,
      errors
    }
  }
`

const SignUpWithData = graphql(signUpMutation, {name: 'signUpMutation'})(
  graphql(kairosSignUpMutation, {name: 'kairosSignUpMutation'})(SignUpContainer)
)

const mapDispatchToProps = (dispatch) => ({
  signInDispatcher (token) {
    dispatch(signIn(token))
  }
})

const SignUpWithDataAndState = connect(
  null,
  mapDispatchToProps
)(SignUpWithData)

export default SignUpWithDataAndState
