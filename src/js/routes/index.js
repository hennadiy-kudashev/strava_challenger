import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from '../components/App';
import DashboardPage from '../components/dashboard/DashboardPage';
import CodeReceiverPage from '../components/auth/CodeReceiverPage';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={DashboardPage} />
        <Route path='code_receiver' component={CodeReceiverPage} />
    </Route>
);

