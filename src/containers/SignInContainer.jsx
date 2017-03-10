import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { signIn } from '../actions'
import { recognize } from '../utils'

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

import styles from './SignInContainer.css'

class SignInContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      imageData: '',
      src: null,
      redirectToReferrer: false,
      width: 300,
      height: 300,
      showPicture: false
    }

    this.handleVideo = this.handleVideo.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleUsernamePassword = this.handleUsernamePassword.bind(this)
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleKairos = this.handleKairos.bind(this)
  }

  componentDidMount () {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({video: true, audio: true}, this.handleVideo, this.handleError)
    }
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

  handleUsernamePassword (e) {
    e.preventDefault()
    if (this.state.username.length !== 0) {
      const newUserInfo = {
        username: this.state.username,
        password: this.state.password
      }

      this.props.signInMutation({ variables: newUserInfo })
      .then((response) => {
        this.props.signInDispatcher(response.data.signIn.token)
        this.setState({
          redirectToReferrer: true
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  handleKairos (e) {
    this.setState({
      showPicture: true
    })
    const video = this.refs.video
    const picture = this.refs.canvas
    picture.width = 550
    picture.height = 550
    picture.getContext('2d').drawImage(video, 0, 0)
    let imgData = picture.toDataURL('img/png')
    let imageData = imgData.replace('data:image/png;base64,', '')
    const params = {
      image: imageData,
      gallery_name: 'snapflix'
    }
    console.log('Params: ', params)
    const context = this
    recognize(params)
    .then(function (data) {
      const userInfo = {
        username: data.body.images[0].transaction.subject_id
      }

      context.props.kairosSignInMutation({ variables: userInfo })
      .then((response) => {
        console.log('Reponse: ', response)
        if (response.data.kairosSignIn.errors.length === 0) {
          context.props.signInDispatcher(response.data.kairosSignIn.token)
          context.setState({
            redirectToReferrer: true
          })
        } else {
          console.log('UnSuccessful signup: ', response)
          context.setState({
            errors: response.data.kairosSignIn.errors
          })
        }
      })
    })
    .catch((err) => {
      console.log('There was an error: ', err)
    })
  }

  handleVideo (stream) {
    this.setState({
      src: window.URL.createObjectURL(stream)
    })
  }

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

    const canvas = this.state.showPicture ? <canvas ref='canvas' className={styles.canvas} /> : null

    return (
      <div className={styles.container}>
        <div className={styles.header}><h1>Sign In</h1></div>
        <div className={styles.signInForm}>
          <div className={styles.signInLeft}>
            <div className={styles.signInContainer}>
              <div>Sign in with your username and password below:</div><br />
              <form ref='info' onSubmit={this.handleUsernamePassword}>
                <input className={styles.signInInput} type='text' placeholder='Username' onChange={this.handleUsername} />
                <br />
                <input className={styles.signInInput} type='password' placeholder='Password' onChange={this.handlePassword} />
                <br />
                <button className={styles.signInButton} type='submit'>Sign in</button>
              </form>
            </div>
          </div>
          <div className={styles.signInRight}>
            <div className={styles.kairosForm}>
              <div className={styles.videoContainer}>
                <div>Sign in with your face below:</div><br />
                <video src={this.state.src} ref='video' autoPlay />
                {canvas}
              </div>
              <button className={styles.signInButton} type='submit' onClick={this.handleKairos} >Sign in</button>
              <br />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <Link to='/signup'>Don't have an account? Sign up</Link>
        </div>

      </div>
    )
  }
}

const signInMutation = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token,
      errors
    }
  }
`

const kairosSignInMutation = gql`
  mutation kairosSignIn($username: String!) {
    kairosSignIn(username: $username) {
      token,
      errors
    }
  }
`

const SignInWithData = graphql(signInMutation, {name: 'signInMutation'})(
  graphql(kairosSignInMutation, {name: 'kairosSignInMutation'})(SignInContainer)
)

const mapDispatchToProps = (dispatch) => ({
  signInDispatcher (token) {
    dispatch(signIn(token))
  }
})

const SignInWithDataAndState = connect(
  null,
  mapDispatchToProps
)(SignInWithData)

export default SignInWithDataAndState
