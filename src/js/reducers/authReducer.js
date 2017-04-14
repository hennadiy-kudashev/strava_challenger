import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";
import {browserHistory} from "react-router";

export default function authReducer(state = initialState.auth, action) {
    switch (action.type) {
        case types.SET_IS_AUTHENTICATED:
            return Object.assign({}, state, {isAuthenticated: action.isAuthenticated});
        case types.SET_AUTH_USER:
            return Object.assign({}, state, {
                user:Object.assign(action.user, {token: action.token})
            });
        default:
            return state;
    }
}
