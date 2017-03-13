import { combineReducers } from 'redux';
import authReducer from './authReducer';
import clubReducer from './clubReducer';

export default combineReducers({
    auth: authReducer,
    club: clubReducer
});