/* global __API__ */

'use strict'

import axios from 'axios'

export function signUpUser (newUserInfo) {
  return {
    type: 'SIGN_UP',
    payload: axios({
      method: 'POST',
      url: __API__ + '/auth/register',
      data: newUserInfo
    })
    .then((response) => {
      window.localStorage.setItem('snapflixtoken', response.data.token)
      return response.data
    })
    .catch((err) => {
      console.log('SIGN UP USER ERROR', err)
    })
  }
}

export function signInUser (userInfo) {
  return {
    type: 'SIGN_IN',
    payload: axios({
      method: 'POST',
      url: __API__ + '/auth/login',
      data: userInfo
    })
  .then((response) => {
    window.localStorage.setItem('snapflixtoken', response.data.token)
    return response.data
  })
  .catch((err) => {
    console.log('SIGN IN USER ERR: ', err)
  })
  }
}

export function faceSignInUser (userInfo) {
  return {
    type: 'SIGN_IN_WITH_FACE',
    payload: axios({
      method: 'POST',
      url: __API__ + '/faceAuth',
      data: {
        username: userInfo
      }
    })
  .then((response) => {
    window.localStorage.setItem('snapflixtoken', response.data.token)
    console.log('testing face sign in', response.data)
    return response.data
  })
  .catch((err) => {
    console.log('SIGN IN USER ERR: ', err)
  })
  }
}

export function signOut () {
  window.localStorage.removeItem('snapflixtoken')
  return {
    type: 'SIGN_OUT_USER',
    payload: 'signedout'
  }
}
