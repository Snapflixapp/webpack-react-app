import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Root from './root'
import Nav from './nav'
import Main from './main'
import Home from './home'
import Signin from './signin'
import Upload from './upload'
import NoMatch from './NoMatch'

const App = () => (
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
)

export default App
