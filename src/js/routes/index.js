import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from '../containers/App';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={Login} />
        <Route path='/dashboard' component={Dashboard} />
    </Route>
);

