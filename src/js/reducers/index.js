import { combineReducers } from 'redux';
import authReducer from './authReducer';
import clubReducer from './clubReducer';
import statsReducer from './statsReducer';

export default combineReducers({
    auth: authReducer,
    club: clubReducer,
    stats: statsReducer
});
