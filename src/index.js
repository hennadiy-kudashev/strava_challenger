import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import Login from './containers/Login'
import Layout from './containers/Layout'
import configureStore from './store/configureStore'

const store = configureStore()

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={App} />
                <Route path='/login' component={Login} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)