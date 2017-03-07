/* global __API__ */

import React from 'react'
import ReactDOM from 'react-dom'

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { AUTH_SIGNIN } from './actions'
import authReducer from './reducers'

const token = window.localStorage.getItem('token')

const networkInterface = createNetworkInterface({ uri: __API__ + '/graphql' })

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  }
}])

const client = new ApolloClient({
  networkInterface
})

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    auth: authReducer,
    form: formReducer
  }),
  {},
  compose(
    applyMiddleware(client.middleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
)

if (token) {
  store.dispatch({ type: AUTH_SIGNIN })
}

// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader'
import App from './containers/App'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider store={store} client={client}>
        <Component />
      </ApolloProvider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(App)
  })
}
