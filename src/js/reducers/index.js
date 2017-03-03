import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import clubReducer from './clubReducer';

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    club: clubReducer
});