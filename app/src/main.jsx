import React from 'react';
import {Nav} from './nav.jsx';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Nav />
      </div>
    );
  }
}

export {MainLayout};
