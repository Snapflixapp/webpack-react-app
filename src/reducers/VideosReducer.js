'use strict'

export default function reducer (state = {
  videos: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'FETCH_VIDEOS': {
      return Object.assign({}, state, {fetching: true
      })
    }
    case 'FETCH_VIDEOS_REJECTED': {
      return Object.assign({}, state, {fetching: false, error: action.payload
      })
    }
    case 'FETCH_VIDEOS_FULFILLED': {
      return Object.assign({}, state, {fetching: false, fetched: true, videos: action.payload
      })
    }
  }
  return state
}

