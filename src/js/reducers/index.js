import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './authReducer';
import challengesReducer from './challengesReducer';
import errorReducer from './errorReducer';
import clubsReducer from './clubsReducer';
import challengesLoading from './challengesLoadingReducer';
import challengeAthletesLoading from './challengeAthletesLoadingReducer';


export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  challenges: challengesReducer,
  routing: routerReducer,
  clubs: clubsReducer,
  challengesLoading,
  challengeAthletesLoading
});
