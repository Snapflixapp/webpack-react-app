// var initialState = {
//   username: null,
//   password: null,
//   fetching: false,
//   fetched: false,
//   error: null
// }

export default function reducer (state, action) {
  if (typeof state === 'undefined') {
    state = {}
  }
  switch (action.type) {
    case 'SIGN_UP_PENDING':
      return Object.assign({}, state, {
        fetching: true
      })
    case 'SIGN_UP_REJECTED':
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload
      })
    case 'SIGN_UP_FULFILLED':
      return Object.assign({}, state, {
        user: action.payload.token,
        fetching: false,
        fetched: true
      })
    case 'SIGN_IN_PENDING':
      return Object.assign({}, state, {
        fetching: true
      })
    case 'SIGN_IN_REJECTED':
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload
      })
    case 'SIGN_IN_FULFILLED':
      return Object.assign({}, state, {
        user: action.payload.token,
        fetching: false,
        fetched: true
      })
    default:
      return state
  }
}
