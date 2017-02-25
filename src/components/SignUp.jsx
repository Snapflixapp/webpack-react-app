import React, {Component} from 'react'
import styles from './SignUp.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userAction from '../actions/UserAction'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // firstName: '',
      // lastName: '',
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleFirstNameText = this.handleFirstNameText.bind(this)
    // this.handleLastNameText = this.handleLastNameText.bind(this)
    this.handleUsernameText = this.handleUsernameText.bind(this)
    this.handlePasswordText = this.handlePasswordText.bind(this)
  }

  // handleFirstNameText (e) {
  //   this.setState({
  //     firstName: e.target.value
  //   })
  //   console.log(this.state.firstName)
  // }
  //
  // handleLastNameText (e) {
  //   this.setState({
  //     lastName: e.target.value
  //   })
  //   console.log(this.state.lastName)
  // }

  handleUsernameText (e) {
    this.setState({
      username: e.target.value
    })
    console.log(this.state.username)
  }

  handlePasswordText (e) {
    this.setState({
      password: e.target.value
    })
    console.log(this.state.password)
  }

  handleSubmit (e) {
    e.preventDefault()
    var newUserInfo = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.signUpUser(newUserInfo)
    this.refs.info.reset()
  }

  render () {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Sign up</h1>
        <form ref='info' onSubmit={this.handleSubmit}>
          {
          //  <label>First Name: </label>
          //  <input type='text' onChange={this.handleFirstNameText} />
          //  <br />
          //  <label>Last Name: </label>
          //  <input type='text' onChange={this.handleLastNameText} />
          //  <br />
        }
          <label>Username: </label>
          <input type='text' placeholder='Username' onChange={this.handleUsernameText} />
          <br />
          <label>Password: </label>
          <input type='password' placeholder='Password' onChange={this.handlePasswordText} />
          <br />
          <button className={styles.signInButton} type='submit' onClick={this.handleSubmit}>Sign up</button>
          <br />
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    signUpUser: userAction.signUpUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
