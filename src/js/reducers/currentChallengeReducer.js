import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";
import athletesReducer from '../reducers/athletesReducer';

export default function currentChallengeReducer(state = initialState.currentChallenge, action) {
    switch (action.type) {
        case types.FOLLOW_CHALLENGE:
            return state;
        case types.SET_CHALLENGE_ATHLETE_INFO:
        case types.SET_CHALLENGE_ATHLETE_ACTIVITIES:
            return Object.assign({}, state, {
                athletes: athletesReducer(state.athletes, action)
            });
        default:
            return state;
    }
}
