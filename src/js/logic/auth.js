import accessTokenStorage from '../api/accessTokenStorage';
import * as authActions from '../actions/authActions';
import outhApi from '../api/oauthApi';
import {browserHistory} from "react-router";

export function authenticate(store) {
    if (accessTokenStorage.isExist()){
        store.dispatch(authActions.setIsAuthenticated(true));
        store.dispatch(authActions.getAuthUser());
    } else {
        //window.location = outhApi.getAuthorizeURL();
        //browserHistory.push('/');
    }
}