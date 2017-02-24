import React from 'react'
import {Route, IndexRoute} from 'react-router'

// these are all the components that will be assigned to a route
import App from './components/App'
import VideoList from './containers/VideoList'
import {SignIn} from './components/SignIn'
import {SignUp} from './components/SignUp'
import {Upload} from './components/Upload'
import {NoMatch} from './components/NoMatch'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={VideoList} />
    <Route path='signin' component={SignIn} />
    <Route path='signup' component={SignUp} />
    <Route path='upload' component={Upload} />
    <Route component={NoMatch} />
  </Route>
)