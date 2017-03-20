import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from '../components/App';
import DashboardPage from '../components/dashboard/DashboardPage';
import CodeReceiverPage from '../components/auth/CodeReceiverPage';
import LandingPage from '../components/landing/LandingPage';
import accessTokenStorage from '../api/accessTokenStorage';
import ChallengePage  from '../components/challenge/ChallengePage';

export default (
    <Route path="/">
        <IndexRoute component={LandingPage} />
        <Route path="code_receiver" component={CodeReceiverPage} />
        <Route path="/" component={App} onEnter={requireAuth}>
            <Route path="dashboard" component={DashboardPage} />
            <Route path="challenge/:id" component={ChallengePage} />
        </Route>
    </Route>
);

function requireAuth(nextState, replace) {
    if (!accessTokenStorage.isExist()) {
        replace({
            pathname: '/'
        });
    }
}

