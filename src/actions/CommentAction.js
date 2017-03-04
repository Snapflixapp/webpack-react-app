export function addComment (commentObj) {
  return {
    type: 'ADD_COMMENT',
    payload: commentObj
  }
}
