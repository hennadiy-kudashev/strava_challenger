import accessTokenStorage from '../api/accessTokenStorage';
import * as authActions from '../actions/authActions';

export function authenticate(store) {
    if (accessTokenStorage.isExist()){
        store.dispatch(authActions.setIsAuthenticated(true, window.location.pathname));
        store.dispatch(authActions.getAuthUser());
    }
}