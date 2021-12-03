import React from 'react';
import ReactDOM from 'react-dom';

import Routing from 'Controllers/Router/Router';

import reportWebVitals from './reportWebVitals';

import store from 'Store';
import {Provider} from 'react-redux';
import User from 'Views/Components/Tables/User'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Routing />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
