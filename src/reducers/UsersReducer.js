'use strict'

export default function reducer (state = {
  users: ['user1', 'user2'],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'FETCH_USERS': {
      return Object.assign({}, state, {fetching: true
      })
    }
    case 'FETCH_USERS_REJECTED': {
      return Object.assign({}, state, { fetching: false, error: action.payload
      })
    }
    case 'FETCH_USERS_FULFILLED': {
      return Object.assign({}, state, {
        fetching: false, fetched: true, users: action.payload
      })
    }
  }
  return state
}
