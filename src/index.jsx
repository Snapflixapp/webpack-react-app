import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'

// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader'

import routes from './routes'

ReactDOM.render(
  <AppContainer>
    <Router history={browserHistory} routes={routes} />
  </AppContainer>,
  document.getElementById('root')
)

// Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./routes', () => {
//     render()
//   })
// }
