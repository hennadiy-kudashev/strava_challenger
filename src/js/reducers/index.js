import { combineReducers } from 'redux';
import authReducer from './authReducer';
import challengesReducer from './challengesReducer';
import errorReducer from './errorReducer';
import { routerReducer  } from 'react-router-redux';


export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    challenges: challengesReducer,
    routing: routerReducer
});
