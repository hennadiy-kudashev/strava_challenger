import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function errorReducer(state = initialState.errors, action) {
    switch (action.type) {
        case types.SET_ERROR:
            return [...state, action.error];
        case types.REMOVE_ERROR:
            return [...state.filter(e => e !== action.error)];
        default:
            return state;
    }
}
