exports.selectVideo = (video) => {
  console.log('from action', video)
  return {
    type: 'VIDEO_SELECTED',
    payload: video
  }
}
