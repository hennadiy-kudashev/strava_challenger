import { combineReducers } from 'redux';
import authReducer from './authReducer';
import clubReducer from './clubReducer';
import challengeReducer from './challengeReducer';

export default combineReducers({
    auth: authReducer,
    club: clubReducer,
    challenges: challengeReducer
});
