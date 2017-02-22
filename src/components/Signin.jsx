import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectUser } from '../actions/UserAction'

class Signin extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.createListItem = this.createListItem.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log('CLICKED')
  }

  createListItem () {
    return this.props.usersData.map((user) => {
      return(
        <li key={user.id} onClick={() => {this.props.selectUser(user)}} >{user.name} {user.description}</li>
      )
    })
  }

  render () {
    return (
      <div className='container'>
      Signin
      <input type='text' /><br/>
      <input type='text' />
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
    selectUser: selectUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
