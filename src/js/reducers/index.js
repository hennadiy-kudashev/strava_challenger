import { combineReducers } from 'redux';
import authReducer from './authReducer';
import clubReducer from './clubReducer';
import challengesReducer from './challengesReducer';
import errorReducer from './errorReducer';
import { routerReducer  } from 'react-router-redux';


export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    club: clubReducer,
    challenges: challengesReducer,
    routing: routerReducer
});
