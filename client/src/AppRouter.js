import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { HOMEPAGE_URL, ROOM_URL} from './settings/urls';

import NotFoundPage from './pages/NotFoundPage';
import Home from './pages/Home';
import Room from './pages/Room';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path={HOMEPAGE_URL} component={Home} />
      <Route exact path={ROOM_URL} component={Room} />
      <Route componen={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
