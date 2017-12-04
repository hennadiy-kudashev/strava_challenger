import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function authReducer(state = initialState.auth, action) {
    switch (action.type) {
        case types.SET_AUTH_USER:
            return Object.assign({}, state, {
                user: Object.assign(action.user)
            });
        default:
            return state;
    }
}
