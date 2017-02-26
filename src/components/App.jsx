import React, { Component } from 'react'
import {Navbar} from './Navbar'
import {Provider} from 'react-redux'

import {applyMiddleware, createStore} from 'redux'


// thunk is an action creater that returns function to allow async operation
import thunk from 'redux-thunk'

// promisify axios call with pre-defined action type
import promise from 'redux-promise-middleware'

// logger will track the axio request
import logger from 'redux-logger'
// bring in all reducers
import allReducers from '../reducers'

const middleWare = applyMiddleware(promise(), thunk, logger())

class App extends Component {
  render () {
    return (
      <Provider store={store} >
        <div>
          <Navbar />
          <div>{this.props.children}</div>
        </div>
      </Provider>
    )
  }
}

export default App
