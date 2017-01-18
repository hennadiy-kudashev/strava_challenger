import 'babel-polyfill';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes';

// Load styles
import '../resources/styles/styles.css';
import '../../node_modules/normalize.css/normalize.css';

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);

