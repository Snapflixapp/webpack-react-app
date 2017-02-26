'use strict'
/* global XMLHttpRequest, XDomainRequest */
import { fetch } from 'react'
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
export function captureUserMedia (callback) {
  var params = { audio: false, video: true }
  navigator.getUserMedia(params, callback, function (error) {
    console.log(JSON.stringify(error))
  })
}
// handle S3 upload
function getSignedUrl (file) {
  var queryString = '?objectName=' + file.id + '&contentType=' + encodeURIComponent(file.type)
  return fetch('/s3/sign' + queryString)
  .then(function (response) {
    return response.json()
  })
  .catch(function (err) {
    console.log('error: ', err)
  })
}
function createCORSRequest (method, url) {
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
  return new Promise(function (resolve, reject) {
    getSignedUrl(fileInfo)
    .then(function (s3Info) {
      // upload to S3
      var xhr = createCORSRequest('PUT', s3Info.signedUrl)
      xhr.onload = function () {
        if (xhr.status === 200) {
          console.log(xhr.status)
          resolve(true)
        } else {
          console.log(xhr.status)
          reject(xhr.status)
        }
      }
      xhr.setRequestHeader('Content-Type', fileInfo.type)
      xhr.setRequestHeader('x-amz-acl', 'public-read')
      return xhr.send(fileInfo.data)
    })
  })
}
