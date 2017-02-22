import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Root from '../components/Root'
import Nav from '../components/Nav'
import Main from '../components/Main'
import Home from '../components/Home'
import Signin from '../components/Signin'
import Upload from '../components/Upload'
import NoMatch from '../components/NoMatch'
// import { store } from '../store'

import { Provider } from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
// thunk is an action creater that returns function to allow async operation
import thunk from 'redux-thunk'
// promisify axios call with pre-defined action type
import promise from 'redux-promise-middleware'
// logger will track the axio request
import logger from 'redux-logger'
import allReducers from '../reducers'

// middleware bundler
const middleware = applyMiddleware(promise(), logger(), thunk)

// create store and pass in combined reducers and all middle wares
const store = createStore(allReducers, middleware)

const App = () => (
  <Provider store={store} >
    <Router>
      <Root>
        <Nav />
        <Main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signin' component={Signin} />
            <Route path='/upload' component={Upload} />
            <Route component={NoMatch} />
          </Switch>
        </Main>
      </Root>
    </Router>
  </Provider>
)

export default App
