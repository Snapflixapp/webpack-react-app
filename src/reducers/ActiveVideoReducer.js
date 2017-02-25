var initialState = {}

export default function reducer (state, action) {
  if (typeof state === 'undefined') {
    state = initialState
  }
  console.log('inside video reducer', action.payload)
  switch (action.type) {
    case 'VIDEO_SELECTED':
      return Object.assign({}, state, action.payload)
  }
  return state
}
