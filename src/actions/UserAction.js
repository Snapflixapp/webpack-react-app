/* global __API__ */

'use strict'

import axios from 'axios'

export function signUpUser (newUserInfo) {
  axios({
    method: 'POST',
    url: __API__ + '/auth/register',
    data: newUserInfo
  }).then((response) => {
    window.localStorage.setItem('snapflixtoken', response.data.token)
    console.log('testing sign in', response)
    return {
      type: 'SIGN_UP',
      payload: response.data
    }
  })
  .catch((err) => {
    console.log(err)
  })
}

export function signInUser (userInfo) {
  axios({
    method: 'POST',
    url: __API__ + '/auth/login',
    data: userInfo
  })
  .then((response) => {
    window.localStorage.setItem('snapflixtoken', response.data.token)
    console.log('testing sign in', response)
    return {
      type: 'SIGN_IN',
      payload: response.data
    }
  })
  .catch((err) => {
    console.log(err)
  })
}
