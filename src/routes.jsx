import React from 'react'
import App from './app'
import Home from './home'

import { Route, IndexRoute } from 'react-router'

module.exports = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
  </Route>
)
