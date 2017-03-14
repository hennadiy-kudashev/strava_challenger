import * as authAction from '../actions/authActions';

export default function createHandler(dispatch) {
    return function handleError(error) {
        if (error.status === 401) {
            dispatch(authAction.logout());
        }
        else {
            console.error('Caught an exception!', error);
        }
    };
}