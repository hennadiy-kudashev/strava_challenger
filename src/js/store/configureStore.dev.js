import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "../reducers";
import createLogger from "redux-logger";
//import thunk from "redux-thunk";
import thunk from '../utils/thunk';
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk, createLogger(), reduxImmutableStateInvariant())
        )
    );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
