/* global __API__ */

'use strict'

import axios from 'axios'
import { get } from 'lodash'

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

export function captureUserMedia (callback) {
  var params = { audio: false, video: true }
  navigator.getUserMedia(params, callback, (error) => {
    console.log(JSON.stringify(error))
  })
}

// handle S3 upload
const getSignedUrl = (file) => {
  const token = window.localStorage.getItem('snapflixtoken')

  axios.defaults.baseURL = __API__
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

  return axios.post(`/graphql?query=
    mutation {
      createVideo(title: "${file.title}") {
        id
        signedUrl
      }
    }`)
  .then(r => r.data)
  .catch((e) => console.log('Error occured. Cannot get signedUrl from AWS: ', e))
}

export function S3Upload (file) { // parameters: { type, data, id }
  return getSignedUrl(file)
    .then((response) => {
      const headers = {}
      headers['Content-Type'] = file.type
      headers['x-amz-acl'] = 'public-read'

      axios.defaults.baseURL = ''
      delete axios.defaults.headers.common['Authorization']
      const signedUrl = get(response, ['data', 'createVideo', 'signedUrl'])
      axios({
        method: 'put',
        url: signedUrl,
        data: file.data,
        headers: headers
      })
    })
    .catch(err => new Error('Error occured. Cannot upload data to AWS S3: ', err))
}
