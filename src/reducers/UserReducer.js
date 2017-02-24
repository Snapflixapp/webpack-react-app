export default function reducer (state = {
  // firstName: null,
  // lastName: null,
  username: null,
  password: null
}, action) {
  switch (action.type) {
    case 'SIGN_UP_FULFILLED': {
      return Object.assign({}, state, {
        // firstName: action.payload.firstName,
        // lastName: action.payload.lastName,
        username: action.payload.username,
        password: action.payload.password
      })
    }
  }
  return state
}
