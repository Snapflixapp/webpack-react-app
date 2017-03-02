'use strict'

import axios from 'axios'

export function getComment () {
  axios.get(__API__ + '/comments')
  .then((resp) => {
    return {
      type: 'GET_COMMENT',
      payload: resp.data
    }
  })
}

export function saveComment (commentObj) {
  console.log(commentObj)
  axios({
    method: 'POST',
    url: __API__ + '/comments',
    data: commentObj
  })
  .then((resp) => {
    console.log('comment saved!!', resp.data)
    return {
      type: 'SAVE_COMMENT',
      payload: resp.data
    }
  })
}
