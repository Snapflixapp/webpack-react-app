import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import SignUpForm from '../components/SignUpForm'
import { signIn } from '../actions'

import styles from './SignUpContainer.css'

class SignUpFormContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      redirectToReferrer: false,
      errors: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    this.props.mutate({ variables: e })
    .then((response) => {
      if (response.data.signUp.errors.length === 0) {
        this.props.signInDispatcher(response.data.signUp.token)
        this.setState({
          redirectToReferrer: true
        })
      } else {
        this.setState({
          errors: response.data.signUp.errors
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render () {
    const redirectToReferrer = this.state.redirectToReferrer
    if (redirectToReferrer) {
      return (
        <Redirect to={{ pathname: '/' }} />
      )
    }
    return (
      <div className={styles.container}>
        <h1>Sign Up</h1>
        <SignUpForm
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    )
  }
}

const signUpMutation = gql`
  mutation signUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      token,
      errors
    }
  }
`

const SignUpWithData = graphql(signUpMutation)(SignUpFormContainer)

const mapDispatchToProps = (dispatch) => ({
  signInDispatcher (token) {
    dispatch(signIn(token))
  }
})

const SignUpWithDataAndState = connect(
  null,
  mapDispatchToProps
)(SignUpWithData)

export default SignUpWithDataAndState
