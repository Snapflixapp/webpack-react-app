'use strict'
// import * as userAction from '../actions/UserAction'

// export default function reducer (state = {
//   username: null,
//   password: null,
//   fetching: false,
//   fetched: false,
//   error: null
// }, action) {
//   switch (action.type) {
//     case 'FETCH_USER_PENDING': {
//       return Object.assign({}, state, {fetching: true
//       })
//     }
//     case 'FETCH_USER_REJECTED': {
//       return Object.assign({}, state, {fetching: false, error: action.payload
//       })
//     }
//     case 'FETCH_USER_FULFILLED': {
//       return Object.assign({}, state, {fetching: false, fetched: true, username: action.payload.username
//       })
//     }
//   }
//   return state
// }

export default function reducer () {
  return [
    {
      id: 1,
      name: 'johnny kwong',
      age: 34,
      description: 'cheerful'
    },
    {
      id: 2,
      name: 'charlene kwong',
      age: 12,
      description: 'playful'
    },
    {
      id: 3,
      name: 'michelle kwong',
      age: 13,
      description: 'funny'
    }
  ]
}
