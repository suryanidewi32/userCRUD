import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import HomeControl from 'Views/Components/Layout/Index';
import User from 'Views/Components/Tables/User'


const Routing = () => (
  <BrowserRouter>
    <Switch>
      <HomeControl path="/" component={User} />
    </Switch>
  </BrowserRouter>
);
export default Routing;
