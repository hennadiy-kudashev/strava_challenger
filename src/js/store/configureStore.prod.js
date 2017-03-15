import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from '../utils/thunk';


export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk));
}