import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import SignInForm from '../components/SignInForm'
import { signIn } from '../actions'

import styles from './SignInContainer.css'

class SignInFormContainer extends Component {
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
      if (response.data.signIn.errors.length === 0) {
        this.props.signInDispatcher(response.data.signIn.token)
        this.setState({
          redirectToReferrer: true
        })
      } else {
        this.setState({
          errors: response.data.signIn.errors
        })
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }

  render () {
    const redirectToReferrer = this.state.redirectToReferrer
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div className={styles.container}>
        <h1>Sign in</h1>
        <SignInForm
          onSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    )
  }
}

const signInMutation = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token,
      errors
    }
  }
`

const SignInWithData = graphql(signInMutation)(SignInFormContainer)

const mapDispatchToProps = (dispatch) => ({
  signInDispatcher (token) {
    dispatch(signIn(token))
  }
})

const SignInWithDataAndState = connect(
  null,
  mapDispatchToProps
)(SignInWithData)

export default SignInWithDataAndState
