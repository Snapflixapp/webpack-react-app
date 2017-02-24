import React, {Component} from 'react'
import styles from './SignIn.css'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import { Link } from 'react-router'
// import * as userAction from '../actions/UserAction'

export class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    // this.createListItem = this.createListItem.bind(this)
    this.handleNameText = this.handleNameText.bind(this)
    this.handlePasswordText = this.handlePasswordText.bind(this)
  }

  handleNameText (e) {
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
    let nameAndPassword = this.state.username + ' ' + this.state.password
    this.props.signUpUser(nameAndPassword)
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
        <h1 className={styles.title}>Sign in</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Username: </label>
          <input type='text' onChange={this.handleNameText} />
          <br />
          <label>Password: </label>
          <input type='text' onChange={this.handlePasswordText} />
          <br />
          <button className={styles.signInButton} type='submit' onClick={this.handleSubmit}>Sign in</button>
          <br />
          <Link to='/signup'>Don't have an account? Click here to sign up!</Link>
        </form>
      </div>
    )
  }
}
