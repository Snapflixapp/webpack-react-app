// /* global __API__ */

'use strict'

import axios from 'axios'
import Kairos from 'kairos-api'
const client = new Kairos('7f0ac7e4', '84be0d7236ae0f1a91070d203e0f887b')

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

const captureUserMedia = (callback) => {
  var params = { audio: false, video: true }
  navigator.getUserMedia(params, callback, (error) => {
    console.error(JSON.stringify(error))
  })
}

const register = function (params) {
  return client.enroll(params)
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    console.log('There was an error registering with Kairos', err)
  })
}

const recognize = function (params) {
  return client.recognize(params)
  .then(function (data) {
    return data
  })
  .catch(function (err) {
    return err
  })
}

const S3Upload = (video) => { // parameters: { type, data, id }
  console.log('Video: ', video)
  const headers = {}
  headers['Content-Type'] = video.type
  headers['x-amz-acl'] = 'public-read'

  return axios({
    method: 'put',
    url: video.signedUrl,
    data: video.data,
    headers: headers
  })
}

export { captureUserMedia, register, recognize, S3Upload }
