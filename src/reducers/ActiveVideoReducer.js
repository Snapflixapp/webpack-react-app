var initialState = {}

export default function reducer (state, action) {
  if (typeof state === 'undefined') {
    state = initialState
  }
  switch (action.type) {
    case 'VIDEO_SELECTED':
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}
