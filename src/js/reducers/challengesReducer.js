import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";
import currentChallengeReducer from "../reducers/currentChallengeReducer";

export default function challengesReducer(state = initialState.challenges, action) {
    switch (action.type) {
        case types.EDIT_CHALLENGE:
            return [...state.filter(challenge=>challenge._id !== action.challenge._id), Object.assign({}, action.challenge)];
        case types.REMOVE_CHALLENGE:
            return state.filter(challenge=>challenge._id !== action.challengeID);
        case types.ADD_CHALLENGES:
            return [...state, ...action.challenges];
        case types.ADD_CHALLENGE_ATHLETES:
            return state.map(challenge => {
                if (challenge._id === action.challengeId) {
                    return currentChallengeReducer(challenge, action);
                }
                return challenge;
            });
        default:
            return state;
    }
}
