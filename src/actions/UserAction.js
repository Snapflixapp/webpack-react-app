'use strict'

// action creater
export const selectUser = (user) => {
  console.log('clicked on user: ', user.name)
  // return an action
  return {
    type: 'USER_SELECTED',
    payload: user
  }
}

// import axios from 'axios'
// import {store} from '../store'

// export function fetchUser () {
//   store.dispatch({
//     type: 'FETCH_USER',
//     payload: axios.get('http://rest.learncode.academy/api/wstern/users')
//   })
// }

// store.dispatch(
//   //dispatch an event here

//   //WITH Promise: it takes in a object
//   {
//     type: "FETCH_USERS",
//     //no need to write .then or .catch, promise will handle all those with a correct FETCH_USER_PENDING or FETCH_USERS_REJECTED or FETCH_USER_FULFILL
//     payload: axios.get("http://rest.learncode.academy/api/wstern/users")
//   }

//   // WITH OUT Promise:
//   (dispatch) => {
//   dispatch({type: "FETCH_USERS_START"})
//   axios.get("http://rest.learncode.academy/api/wstern/users")
//   .then((resp) => {
//     //then do something async
//     //then dispatch something else
//     dispatch({type: "RECEIVE_USERS", payload: resp.data})
//    })
//   .catch((err) => {
//     dispatch(type: "FETCH_USERS_ERROR", payload: err)
//   })
// }

// export function fetchTweets() {
//   return function(dispatch) {
//     axios.get("http://rest.learncode.academy/api/test123/tweets")
//       .then((response) => {
//         dispatch({type: "FETCH_TWEETS_FULFILLED", payload: response.data})
//       })
//       .catch((err) => {
//         dispatch({type: "FETCH_TWEETS_REJECTED", payload: err})
//       })
//   }
// }