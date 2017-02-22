import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userAction from '../actions/UserAction'

class Signin extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.createListItem = this.createListItem.bind(this)
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

  createListItem () {
    return this.props.usersData.map((user) => {
      return (
        <li key={user.id} onClick={() => { this.props.selectUser(user) }} >{user.name} {user.description}</li>
      )
    })
  }

  render () {
    return (
      <div className='container'>
      Signin
        <input type='text' onChange={this.handleNameText} /><br />
        <input type='text' onChange={this.handlePasswordText} />
        <button type='submit' onClick={this.handleSubmit} >Sign in</button>
        <ul>
          {this.createListItem()}
        </ul>
        <p>{this.props.user.description} {this.props.user.age}</p>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    usersData: state.usersData,
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectUser: userAction.selectUser,
    signUpUser: userAction.signUpUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
