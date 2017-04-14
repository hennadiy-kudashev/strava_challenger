import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory  } from 'react-router';
import rootReducer from '../reducers';
import thunk from '../utils/thunk';


export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, routerMiddleware(browserHistory)));
}
