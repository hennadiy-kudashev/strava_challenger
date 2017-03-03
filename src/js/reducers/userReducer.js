import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function authReducer(state = initialState.user, action) {
    switch (action.type) {
        case types.USER_RECEIVED:
            return Object.assign({}, state, {
                user_name: action.user.username,
                full_name: action.user.firstname + ' ' + action.user.lastname,
                avatar: action.user.profile
            });
        default:
            return state;
    }
}
