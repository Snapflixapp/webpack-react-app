import {
  AUTH_SIGNIN,
  AUTH_SIGNOUT
} from '../actions'

const initialState = {
  authenticated: false,
  redirectToReferrer: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGNIN:
      return {...state, authenticated: true, redirectToReferrer: true}
    case AUTH_SIGNOUT:
      return {...state, authenticated: false, redirectToReferrer: false}
    default:
      return state
  }
}
