import * as types from './actionTypes';
import OauthApi from '../api/oauthApi';
import AthleteApi from '../api/athleteApi';
import accessTokenStorage from "../api/accessTokenStorage";
import { push } from 'react-router-redux';
import UserApi from "../api/userApi";

export function getAccessToken(code) {
    return function (dispatch) {
        return new OauthApi().getToken(code).then(data=> {
            new UserApi().updateToken(data).then(() => {
                accessTokenStorage.set(data.access_token);
                dispatch(setIsAuthenticated(true));
                dispatch(setAuthUser(data.athlete, data.access_token));
                dispatch(push('/dashboard'));
            });
        });
    };
}

export function logout() {
    return function (dispatch) {
        accessTokenStorage.remove();
        dispatch(setIsAuthenticated(false));
        dispatch(setAuthUser({}));
        dispatch(push('/'));
    };
}

export function setIsAuthenticated(isAuthenticated, path) {
    return {type: types.SET_IS_AUTHENTICATED, isAuthenticated};
}

export function getAuthUser() {
    return function (dispatch) {
        return new AthleteApi().getAuthAthlete().then(data=> {
            dispatch(setAuthUser(data, accessTokenStorage.get()));
        });
    };
}

export function setAuthUser(user, token) {
    return {type: types.SET_AUTH_USER, user, token};
}
