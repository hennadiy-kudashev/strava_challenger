import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function authReducer(state = initialState.user, action) {
    switch (action.type) {
        case types.USER_RECEIVED:
            return Object.assign({}, state, {
                user_name: action.user.username,
                first_name: action.user.firstname,
                last_name: action.user.lastname,
                avatar: action.user.profile
            });
        default:
            return state;
    }
}
