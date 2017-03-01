import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function authReducer(state = initialState.auth, action) {
    switch (action.type) {
        case types.REQUEST_ACCESS_SUCCESS:
            return Object.assign({}, state, {code: action.code});
        case types.REQUEST_ACCESS_DENIED:
            return Object.assign({}, state, {error: action.error});
        case types.REQUEST_TOKEN_SUCCESS:
            return Object.assign({}, state, {access_token: action.access_token});
        
        default:
            return state;
    }
}
