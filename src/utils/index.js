// /* global __API__ */

'use strict'

import axios from 'axios'
// import { stringify } from 'qs'

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

export function captureUserMedia (callback) {
  var params = { audio: false, video: true }
  navigator.getUserMedia(params, callback, (error) => {
    console.error(JSON.stringify(error))
  })
}

// handle S3 upload
// const getSignedUrl = (file) => {
//   const token = window.localStorage.getItem('snapflixtoken')
//
//   const headers = {}
//   // headers['Content-Type'] = 'application/json'
//   headers['Authorization'] = 'Bearer ' + token
//
//   const params = {}
//   params['fileName'] = file.title
//   params['contentType'] = file.type
//
//   return axios({
//     url: '/s3/sign',
//     baseURL: __API__,
//     headers: headers,
//     params: params,
//     paramsSerializer: function (params) {
//       return stringify(params, {arrayFormat: 'brackets'})
//     }
//   })
//   .then(r => r.data)
//   .catch((e) => console.error('Error occured. Cannot get signedUrl from AWS: ', e))
// }

export function S3Upload (video) { // parameters: { type, data, id }
  // return getSignedUrl(video)
    // .then((response) => {
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
    // })
    // .catch(err => new Error('Error occured. Cannot upload data to AWS S3: ', err))
}
