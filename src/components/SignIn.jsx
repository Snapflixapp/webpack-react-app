import React, { Component } from 'react'
import styles from './SignIn.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { signInUser } from '../actions/UserAction'
import PictureObject from './signInWithFace'

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNameText = this.handleNameText.bind(this)
    this.handlePasswordText = this.handlePasswordText.bind(this)
  }

  handleNameText (e) {
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
    var userInfo = {
      username: this.state.username,
      password: this.state.password
    }
    this.refs.info.reset()
    this.props.signInUser(userInfo)
  }

  render () {
    console.log(this.props)
    const redirectToReferrer = this.props.redirectToReferrer
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div className={styles.container}>
        <h1>Sign in</h1>
        <h1>picture component will go here</h1>
        <PictureObject />
        <form ref='info' onSubmit={this.handleSubmit}>
          <label>Username: </label>
          <br />
          <input className={styles.signInInput} type='text' placeholder='Username' onChange={this.handleNameText} />
          <br />
          <label>Password: </label>
          <br />
          <input className={styles.signInInput} type='password' placeholder='Password' onChange={this.handlePasswordText} />
          <br />
          <button className={styles.signInButton} type='submit' onClick={this.handleSubmit}>Sign in</button>
          <br />
        </form>
        <div>
          <Link to='/signup'>Don't have an account? Sign up</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    fetching: state.userReducer.fetching,
    fetched: state.userReducer.fetched,
    redirectToReferrer: state.userReducer.redirectToReferrer
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signInUser: signInUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
