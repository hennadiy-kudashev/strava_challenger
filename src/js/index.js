/*eslint-disable import/default*/
import 'babel-polyfill';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import { authenticate } from './logic/auth';

// Load styles
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/admin-lte/bootstrap/css/bootstrap.min.css';
import '../../node_modules/admin-lte/dist/css/AdminLTE.min.css';
import '../../node_modules/admin-lte/dist/css/skins/skin-yellow-light.css';
import '../resources/styles/styles.scss';

const store = configureStore();

authenticate(store);

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);

