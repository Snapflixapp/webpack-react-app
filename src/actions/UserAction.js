import axios from 'axios'

export function signUpUser (newUserInfo) {
  axios({
    method: 'POST',
    url: 'https://api.snapflixapp.com/auth/register',
    data: newUserInfo
  }).then(function (response) {
    window.localStorage.setItem('snapflixtoken', response.data.token)
    console.log('testing sign in', response)
    return {
      type: 'SIGN_UP',
      payload: response.data
    }
  })
  .catch(function (err) {
    console.log(err)
  })
}

export function signInUser (userInfo) {
  axios({
    method: 'POST',
    url: 'https://api.snapflixapp.com/auth/login',
    data: userInfo
  })
  .then(function (response) {
    window.localStorage.setItem('snapflixtoken', response.data.token)
    console.log('testing sign in', response)
    return {
      type: 'SIGN_IN',
      payload: response.data
    }
  })
  .catch(function (err) {
    console.log(err)
  })
}
