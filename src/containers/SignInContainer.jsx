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
      width: 500,
      height: 500
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
    const video = this.refs.video
    const picture = this.refs.canvas
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

    return (
      <div className={styles.container}>
        <h1>Sign In</h1>
        <div>
          <form ref='info' onSubmit={this.handleUsernamePassword}>
            <label>Username: </label>
            <br />
            <input className={styles.signInInput} type='text' placeholder='Username' onChange={this.handleUsername} />
            <br />
            <label>Password: </label>
            <br />
            <input className={styles.signInInput} type='password' placeholder='Password' onChange={this.handlePassword} />
            <br />
            <button className={styles.signInButton} type='submit'>Sign up</button>
          </form>
        </div>
        <div className={styles.kairosForm}>
          <div>
            <div>
              <video src={this.state.src} ref='video' style={{width: '300px', height: '300px'}} autoPlay />
              <canvas ref='canvas' width={this.state.width} height={this.state.height} />
            </div>
          </div>
          <br />
          <button className={styles.signInButton} type='submit' onClick={this.handleKairos} >Sign in</button>
        </div>

        <div>
          <Link to='/signup'>Already have an account? Sign up</Link>
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

// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { Redirect, Link } from 'react-router-dom'
// import gql from 'graphql-tag'
// import { graphql } from 'react-apollo'
//
// import SignInForm from '../components/SignInForm'
// import { signIn } from '../actions'
//
// import styles from './SignInContainer.css'
//
// class SignInFormContainer extends Component {
//   constructor (props) {
//     super(props)
//     console.log('SignInFormContainer props: ', props)
//     this.state = {
//       redirectToReferrer: false,
//       errors: []
//     }
//
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }
//
//   handleSubmit (e) {
//     this.props.mutate({ variables: e })
//       .then((response) => {
//         if (response.data.signIn.errors.length === 0) {
//           this.props.signInDispatcher(response.data.signIn.token)
//           this.setState({
//             redirectToReferrer: true
//           })
//         } else {
//           this.setState({
//             errors: response.data.signIn.errors
//           })
//         }
//       })
//       .catch((err) => {
//         console.error(err)
//       })
//   }
//
//   render () {
//     const redirectToReferrer = this.state.redirectToReferrer
//     const { from } = this.props.location.state || { from: { pathname: '/' } }
//     if (redirectToReferrer) {
//       return (
//         <Redirect to={from} />
//       )
//     }
//
//     return (
//       <div className={styles.container}>
//         <h1>Sign in</h1>
//         <SignInForm
//           onSubmit={this.handleSubmit}
//           errors={this.state.errors}
//         />
//         <div>
//           <Link to='/signup'>Don't have an account? Sign up</Link>
//         </div>
//       </div>
//     )
//   }
// }
//
// const signInMutation = gql`
//   mutation signIn($username: String!, $password: String!) {
//     signIn(username: $username, password: $password) {
//       token,
//       errors
//     }
//   }
// `
//
// const SignInWithData = graphql(signInMutation)(SignInFormContainer)
//
// const mapDispatchToProps = (dispatch) => ({
//   signInDispatcher (token) {
//     dispatch(signIn(token))
//   }
// })
//
// const SignInWithDataAndState = connect(
//   null,
//   mapDispatchToProps
// )(SignInWithData)
//
// export default SignInWithDataAndState
