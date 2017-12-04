import * as types from "./actionTypes";
import accessTokenStorage from "../api/accessTokenStorage";
import {push} from "react-router-redux";
import AuthApi from "../api/authApi";
import UserApi from "../api/userApi";

export function authenticate(code) {
    return function (dispatch) {
        return new AuthApi().auth(code).then(data=> {
            accessTokenStorage.set(data.token);
            dispatch(setAuthUser(data.user));
            dispatch(push('/dashboard'));
        });
    };
}

export function logout() {
    return function (dispatch) {
        accessTokenStorage.remove();
        dispatch(setAuthUser({}));
        dispatch(push('/'));
    };
}

export function getAuthUser() {
    return function (dispatch) {
        return new UserApi().getAuthUser().then(data=> {
            dispatch(setAuthUser(data));
        }, error=>{
            if (error.response.status === 401) { //unauthorized
               dispatch(logout());
            }
        });
    };
}

export function setAuthUser(user) {
    return {type: types.SET_AUTH_USER, user};
}
