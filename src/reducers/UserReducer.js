// var initialState = {
//   username: null,
//   password: null,
//   fetching: false,
//   fetched: false,
//   error: null
// }

export default (state, action) => {
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
    console.log("IN SIGN IN PENGIND")
      return Object.assign({}, state, {
        fetching: true
      })
    case 'SIGN_IN_REJECTED':
    console.log("IN SIGN IN REJECTED")
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload
      })
    case 'SIGN_IN_FULFILLED':
    console.log("IN SIGN IN FULLFILL")
      return Object.assign({}, state, {
        user: action.payload.token,
        fetching: false,
        fetched: true,
        redirectToReferrer: true

      })
    default:
      return state
  }
}
