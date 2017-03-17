import { combineReducers } from 'redux';
import authReducer from './authReducer';
import clubReducer from './clubReducer';
import challengesReducer from './challengesReducer';
import currentChallengeReducer from './currentChallengeReducer';

export default combineReducers({
    auth: authReducer,
    club: clubReducer,
    challenges: challengesReducer,
    currentChallenge: currentChallengeReducer
});
