import axios from 'axios'

export function signUpUser (newUserInfo) {
  console.log('back end received', newUserInfo)
  // return {
  //   type: 'SIGN_UP',
  //   payload: newUserInfo
  // }
  return {
    type: 'SIGN_UP',
    payload: axios({
      method: 'POST',
      url: 'https://api.snapflixapp.com/auth/register',
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/jsonp'
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'content-type, accept',
        'Access-Control-Max-Age': 10, // Seconds.
        'Aontent-Type': 'application/json'
      },
      data: newUserInfo
    })
  }
}

// headers = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10, // Seconds.
//   'Content-Type': 'application/json'
// }
