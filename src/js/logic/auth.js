import accessTokenStorage from '../api/accessTokenStorage';
import * as authActions from '../actions/authActions';

export function authenticate(store) {
    if (accessTokenStorage.isExist()){
        store.dispatch(authActions.setIsAuthenticated(true));
        store.dispatch(authActions.getAuthUser());
    }
}