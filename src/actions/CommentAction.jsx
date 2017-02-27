export function addComment (author, comment) {
  return {
    type: 'ADD_COMMENT',
    author,
    comment
  }
}
