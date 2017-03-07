import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import styles from './App.css'

import Main from '../components/Main'
import NavBar from '../components/Navbar'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import Upload from '../components/Upload'
import NoMatch from '../components/NoMatch'
import Home from '../components/Home'
import VideoProfile from '../containers/VideoProfile'

// const Auth = {
//   isAuthenticated: false,
//   authenticate (cb) {
//     // call __API__/me
//     // return true or false
//     // set window.localStorage.getItem('token')
//     // set this.isAuthenticated to response
//   },
//   signout(cb) {
//     // delete token from localStorage
//     // set this.isAuthenticated = false
//   }
// }
// const isAuthenticated = this.props.isAuthenticated.isAuthenticated
// console.log(isAuthenticated)

const token = window.localStorage.getItem('token')

class App extends Component {
  const { isAuthenticated } = this.props

  componentWillMount () {
  }

  render () {
    const ProtectedRoute = ({ component, ...rest }) => (
      <Route {...rest} render={props => (
        isAuthenticated
        ? (React.createElement(component, props))
        : (<Redirect to={{ pathname: '/signin', state: { from: props.location } }} />)
        )
      } />
    )

    return (
      <Router>
        <div className={styles.app}>
          <NavBar />
          <Main>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <ProtectedRoute path='/upload' component={Upload} />
              <Route path='/video/:index' component={VideoProfile} />
              <Route component={NoMatch} />
            </Switch>
          </Main>
        </div>
      </Router>
    )
  }
}

export default App
