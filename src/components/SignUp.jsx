import React, { Component } from 'react'
import styles from './SignUp.css'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import { signUpUser } from '../actions/UserAction'
// import SignUpObject from './signUpWithFace'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsernameText = this.handleUsernameText.bind(this)
    this.handlePasswordText = this.handlePasswordText.bind(this)
  }

  handleUsernameText (e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePasswordText (e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    var newUserInfo = {
      username: this.state.username,
      password: this.state.password
    }
    this.refs.info.reset()
    this.props.signUpUser(newUserInfo)
  }

  render () {
    const redirectToReferrer = this.props.redirectToReferrer
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div className={styles.container}>
        {/* <SignUpObject /> */}
        <h1>Sign up</h1>
        <form ref='info' onSubmit={this.handleSubmit}>
          <label>Username: </label>
          <br />
          <input className={styles.signUpInput} type='text' placeholder='Username' onChange={this.handleUsernameText} />
          <br />
          <label>Password: </label>
          <br />
          <input className={styles.signUpInput} type='password' placeholder='Password' onChange={this.handlePasswordText} />
          <br />
          <button className={styles.signUpButton} type='submit' onClick={this.handleSubmit}>Sign up</button>
          <br />
        </form>
      </div>
    )
  }
}

export default SignUp

// const mapStateToProps = (state) => {
//   return {
//     user: state.userReducer.user,
//     fetching: state.userReducer.fetching,
//     fetched: state.userReducer.fetched,
//     redirectToReferrer: state.userReducer.redirectToReferrer
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     signUpUser: signUpUser
//   }, dispatch)
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

