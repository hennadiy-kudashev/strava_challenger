import * as types from "./actionTypes";
import OauthApi from "../api/oauthApi";
import * as userActions from "./userActions";

export function requestAccess() {
    return {type: types.REQUEST_ACCESS};
}

export function requestAccessSuccess(code) {
    return function (dispatch) {
        dispatch({
            type: types.REQUEST_ACCESS_SUCCESS,
            code
        });

        return new OauthApi().getToken(code).then(data=> {
            dispatch(requestTokenSuccess(data.access_token));
            dispatch(userActions.userReceived(data.athlete));
        }).catch(error=> {
            dispatch(requestTokenError(error));
        });
    };
}

export function requestAccessDenied(error) {
    return {type: types.REQUEST_ACCESS_DENIED, error};
}

export function requestTokenSuccess(access_token) {
    return {type: types.REQUEST_TOKEN_SUCCESS, access_token};
}

export function requestTokenError(error) {
    return {type: types.REQUEST_TOKEN_ERROR, error};
}