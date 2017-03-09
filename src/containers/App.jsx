import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import styles from './App.css'

import Main from '../components/Main'
import NavContainer from '../containers/NavContainer'
import SignIn from '../containers/SignInContainer'
import SignUp from '../containers/SignUpContainer'
import Upload from '../containers/UploadContainer'
import NoMatch from '../components/NoMatch'
import Home from '../containers/HomeContainer'
import VideoProfile from '../components/VideoProfile'

const App = ({ authenticated }) => {
  const ProtectedRoute = ({ component, ...rest }) => (
    <Route {...rest} render={props => (
      authenticated
      ? (React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/signin',
          state: {
            from: props.location
          }}}
        />)
    )} />
  )

  return (
    <Router>
      <div className={styles.app}>
        <NavContainer />
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

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
})

export default connect(mapStateToProps)(App)
