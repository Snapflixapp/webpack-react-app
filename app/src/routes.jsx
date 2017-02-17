import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {MainLayout} from './main.jsx';
import {Home} from './home.jsx';

export default (
  <Route path="/" component={MainLayout} >
    <IndexRoute component={Home} />
  </Route>
)