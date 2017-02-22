import React from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/UsersAction'

class Signin extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log('CLICKED')
  }

  render () {
    console.log(this.props)
    return (
      <div className='container'>
      Signin
      <button type='submit' onClick={this.handleSubmit} >Sign in</button>
      <p>{}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}
export default Signin
