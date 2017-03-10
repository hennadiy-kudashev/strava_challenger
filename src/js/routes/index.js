import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from '../components/App';
import DashboardPage from '../components/dashboard/DashboardPage';
import CodeReceiverPage from '../components/auth/CodeReceiverPage';
import LandingPage from '../components/landing/LandingPage';

export default (
    <Route path="/">
        <IndexRoute component={LandingPage} />
        <Route path="/" component={App}>
            <Route path="dashboard" component={DashboardPage} />
            <Route path="code_receiver" component={CodeReceiverPage} />
        </Route>
    </Route>
);

