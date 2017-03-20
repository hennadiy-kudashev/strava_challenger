import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function challengeReducer(state = initialState.challenges, action) {
    switch (action.type) {
        case types.CREATE_CHALLENGE:
            return [...state, Object.assign({}, action.challenge)];
        case types.SET_CHALLENGES:
            return action.challenges;
        default:
            return state;
    }
}
