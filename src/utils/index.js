/* global XMLHttpRequest, XDomainRequest, fetch, Headers, __API__ */

'use strict'

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

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', 'Bearer ' + token)

  const options = {
    method: 'GET',
    headers: headers,
    mode: 'cors'
  }

  const queryString = '?fileName=' + encodeURIComponent(file.title) + '&contentType=' + encodeURIComponent(file.type)
  const url = __API__ + '/s3/sign' + queryString

  return fetch(url, options)
  .then((response) => {
    return response.json()
  })
  .catch((err) => {
    console.log('error: ', err)
  })
}

const createCORSRequest = (method, url) => {
  var xhr = new XMLHttpRequest()
  if (xhr.withCredentials != null) {
    xhr.open(method, url, true)
  } else if (typeof XDomainRequest !== 'undefined') {
    // Change to XDomainRequest
    xhr = new XDomainRequest()
    xhr.open(method, url)
  } else {
    xhr = null
  }
  return xhr
}

export function S3Upload (fileInfo) { // parameters: { type, data, id }
  return new Promise((resolve, reject) => {
    getSignedUrl(fileInfo)
    .then((s3Info) => {
      // upload to S3
      var xhr = createCORSRequest('PUT', s3Info.signedUrl)
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(true)
        } else {
          reject(xhr.status)
        }
      }

      xhr.setRequestHeader('Content-Type', fileInfo.type)
      xhr.setRequestHeader('x-amz-acl', 'public-read')
      return xhr.send(fileInfo.data)
    })
  })
}
