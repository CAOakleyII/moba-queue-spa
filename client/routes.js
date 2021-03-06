import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import App from './src/app/App.jsx';
import Home from './src/app/Home.jsx';
import Party from './src/party/Party.jsx';


Meteor.startup(() => {
  window.React = React;
  render(
    (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="party" component={Party} />
        </Route>
      </Router>
    ), document.getElementById('react-content')
  )
});
