import jwtDecode from 'jwt-decode'

export default (state, action) => {
  if (typeof state === 'undefined') {
    state = {
      redirectToReferrer: false,
      isAuthenticated: false
    }
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
        fetched: true,
        redirectToReferrer: true,
        isAuthenticated: true,
        decoded: jwtDecode(action.payload.token)
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
        fetched: true,
        redirectToReferrer: true,
        isAuthenticated: true,
        decoded: jwtDecode(action.payload.token)
      })
    case 'SIGN_IN_WITH_FACE_FULFILLED':
      return Object.assign({}, state, {
        user: action.payload.token,
        fetching: false,
        fetched: true,
        redirectToReferrer: true,
        isAuthenticated: true,
        decoded: jwtDecode(action.payload.token)
      })
    case 'SIGN_OUT_USER':
      return Object.assign({}, state, {
        user: '',
        redirectToReferrer: false,
        isAuthenticated: false,
        decoded: ''
      })
    default:
      return state
  }
}
