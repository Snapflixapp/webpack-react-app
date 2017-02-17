import React from 'react';
import {render} from 'react-dom';
//useing hashHistory to listen to addressbar for change, but will chang to browserHistory once server is set-up.
import {Router, hashHistory} from 'react-router';
import routes from './routes.jsx';


render(
  <Router history={hashHistory} routes={routes} />,document.getElementById('app')
);