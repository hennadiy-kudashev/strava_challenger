import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function challengeReducer(state = initialState.challenges, action) {
    switch (action.type) {
        case types.SET_CHALLENGE:
            return [...state, Object.assign({}, action.challenge)];
        default:
            return state;
    }
}
