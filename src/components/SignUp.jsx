import React, {Component} from 'react'
import styles from './SignUp.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
// import * as userAction from '../actions/UserAction'

export class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    //this.createListItem = this.createListItem.bind(this)
    this.handleFirstNameText = this.handleFirstNameText.bind(this)
    this.handleLastNameText = this.handleLastNameText.bind(this)
    this.handleUsernameText = this.handleUsernameText.bind(this)
    this.handlePasswordText = this.handlePasswordText.bind(this)
  }


  handleFirstNameText (e) {
    this.setState({
      firstName: e.target.value
    })
    console.log(this.state.firstName)
  }

  handleLastNameText (e) {
    this.setState({
      lastName: e.target.value
    })
    console.log(this.state.lastName)
  }

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
    let newUserInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password
    }
    this.props.signUpUser(newUserInfo)
  }

  // createListItem () {
  //   return this.props.usersData.map((user) => {
  //     return (
  //       <li key={user.id} onClick={() => { this.props.selectUser(user) }} >{user.name} {user.description}</li>
  //     )
  //   })
  // }

  render () {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Sign up</h1>
        <form onSubmit={this.handleSubmit}>
          <label>First Name: </label>
          <input type='text' onChange={this.handleFirstNameText} />
          <br />
          <label>Last Name: </label>
          <input type='text' onChange={this.handleLastNameText} />
          <br />
          <label>Username: </label>
          <input type='text' onChange={this.handleUsernameText} />
          <br />
          <label>Password: </label>
          <input type='text' onChange={this.handlePasswordText} />
          <br />
          <button className={styles.signInButton} type='submit' onClick={this.handleSubmit}>Sign up</button>
          <br />
        </form>
      </div>
    )
  }
}
