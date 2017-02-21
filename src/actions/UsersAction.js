'use strict'

import axios from 'axios'
import {store} from '../store'

export function fetchUser () {
  store.dispatch({
    type: 'FETCH_USERS',
    payload: axios.get('http://rest.learncode.academy/api/wstern/users')
  })
}
