import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'

import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
// thunk is an action creater that returns function to allow async operation
import thunk from 'redux-thunk'
// promisify axios call with pre-defined action type
import promise from 'redux-promise-middleware'
// logger will track the axio request
import logger from 'redux-logger'

// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader'

// bring in all reducers
import {allReducers} from './reducers'
import routes from './routes'

const middleWare = applyMiddleware(promise(), thunk, logger())
const store = createStore(allReducers, middleWare)

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store} >
        <Router history={browserHistory} routes={routes} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render()

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes', () => {
    render()
  })
}
