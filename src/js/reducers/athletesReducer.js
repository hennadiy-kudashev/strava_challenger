import * as types from "../actions/actionTypes";

export default function athletesReducer(state = [], action) {
    switch (action.type) {
        case types.ADD_CHALLENGE_ATHLETES:
            return [...state, ...action.athletes];
        case types.REMOVE_CHALLENGE_ATHLETES:
            return state.filter(athlete => athlete.info.id !== action.athleteId);
        default:
            return state;
    }
}
