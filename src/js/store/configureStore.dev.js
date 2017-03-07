import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';


export default function configureStore(initialState) {
    const store = createStore(
        rootReducer, 
        initialState, 
        applyMiddleware(thunk, createLogger(), reduxImmutableStateInvariant()));

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
} 