import React from 'react';

import { Route } from 'react-router-dom';

import LayoutPage from './Layout';

const HomeControl = ({ component: Component, rest }) => (
  <Route
    {...rest}
    render={(routeProps) => (
      <LayoutPage>
        <Component {...routeProps} />
      </LayoutPage>
    )}
  />
);

export default HomeControl;
