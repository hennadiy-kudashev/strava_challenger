import { combineReducers } from 'redux';
import authReducer from './authReducer';
import clubReducer from './clubReducer';
import challengesReducer from './challengesReducer';
import currentChallengeReducer from './currentChallengeReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    club: clubReducer,
    challenges: challengesReducer,
    currentChallenge: currentChallengeReducer

});
