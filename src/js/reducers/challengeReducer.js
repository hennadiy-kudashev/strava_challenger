import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";


export default function challengeReducer(state = initialState.challenges, action) {
    switch (action.type) {
        case types.SET_CHALLENGE:
            return [...state, Object.assign({}, action.challenge)];
        case types.FOLLOW_CHALLENGE:
            return state.map(challenge => {
                    if (challenge.id === action.challengeId) {
                        return Object.assign({}, challenge, {
                            athletes: [...challenge.athletes, action.athlete]
                        });
                    }

                    return challenge;
                }
            );
        case types.SET_CHALLENGE_STATS:
            return state;
        default:
            return state;
    }
}
