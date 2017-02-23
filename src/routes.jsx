import React from 'react'
import {Route, IndexRoute} from 'react-router'

// these are all the components that will be assigned to a route
import App from './components/App'
import {Home} from './containers/Home'
import {SignIn} from './components/SignIn'
import {Upload} from './components/Upload'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/signin' component={SignIn} />
    <Route path='/upload' component={Upload} />
  </Route>
)
