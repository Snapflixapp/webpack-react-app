import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import styles from './App.css'

import Main from '../components/Main'
import NavBar from '../components/Navbar'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import Upload from '../components/Upload'
import NoMatch from '../components/NoMatch'
import VideoList from '../containers/VideoList'
import VideoProfile from '../containers/VideoProfile'
import { connect } from 'react-redux'

// const isAuthenticated = this.props.isAuthenticated.isAuthenticated
// console.log(isAuthenticated)

class App extends Component {
  render () {
    const isAuthenticated = this.props.isAuthenticated
    console.log(isAuthenticated)

    const ProtectedRoute = ({ component, ...rest }) => (
      <Route {...rest} render={props => (
        isAuthenticated
        ? (React.createElement(component, props))
        : (<Redirect to={{ pathname: '/signin', state: { from: props.location } }} />)
      )} />
    )
    return (
      <Router>
        <div className={styles.app}>
          <NavBar />
          <Main>
            <Switch>
              <Route exact path='/' component={VideoList} />
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.userReducer.isAuthenticated
  }
}

export default connect(mapStateToProps)(App)
