import React, { Component } from 'react'
import styles from './SignIn.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { signInUser } from '../actions/UserAction'

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
    return (
      <div className={styles.container}>
        <h1>Sign in</h1>
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
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signInUser: signInUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
