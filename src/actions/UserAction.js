import axios from 'axios'

export function signUpUser (newUserInfo) {
  console.log('signUpUser invoked')
  return {
    type: 'SIGN_UP',
    payload: axios({
      method: 'POST',
      url: 'https://api.snapflixapp.com/auth/register',
      data: newUserInfo
    })
  }
}
