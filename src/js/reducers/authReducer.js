import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";
import {browserHistory} from "react-router";

export default function authReducer(state = initialState.auth, action) {
    switch (action.type) {
        case types.SET_IS_AUTHENTICATED:
            if (action.isAuthenticated){
                browserHistory.push(action.path);
            }
            else{
                browserHistory.push('/');
            }
            return Object.assign({}, state, {isAuthenticated: action.isAuthenticated});
        case types.SET_AUTH_USER:
            return Object.assign({}, state, {
                user: {
                    userName: action.user.username,
                    fullName: `${action.user.firstname} ${action.user.lastname}`,
                    avatar: action.user.profile
                }
            });
        default:
            return state;
    }
}
