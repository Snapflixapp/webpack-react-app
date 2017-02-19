import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Root from '../components/Root'
import Nav from '../components/Nav'
import Main from '../components/Main'
import Home from '../components/Home'
import Signin from '../components/Signin'
import Upload from '../components/Upload'
import NoMatch from '../components/NoMatch'

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
