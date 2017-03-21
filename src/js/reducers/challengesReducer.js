import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";
import currentChallengeReducer from '../reducers/currentChallengeReducer';

export default function challengesReducer(state = initialState.challenges, action) {
    switch (action.type) {
        case types.CREATE_CHALLENGE:
            return [...state, Object.assign({}, action.challenge)];
        case types.SET_CHALLENGES:
            return action.challenges;
        case types.SET_CHALLENGE_ATHLETE_INFO:
        case types.SET_CHALLENGE_ATHLETE_ACTIVITIES:
            return state.map(challenge => {
                if (challenge.id === action.challengeId) {
                    const currentChallenge = currentChallengeReducer(challenge, action);

                    return currentChallenge;
                }

                return challenge;
            });
        default:
            return state;
    }
}
