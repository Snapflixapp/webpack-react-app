var initialState = {
  username: null,
  password: null
}

export default function reducer (state, action) {
  if (typeof state === 'undefined') {
    state = initialState
  }
  switch (action.type) {
    case 'SIGN_UP_FULFILLED': {
      return Object.assign({}, state, {
        username: action.payload.username,
        password: action.payload.password
      })
    }
  }
  return state
}
