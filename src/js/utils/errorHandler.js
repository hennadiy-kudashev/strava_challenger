/*eslint-disable no-console*/
import * as authAction from '../actions/authActions';
import  * as errorActions from '../actions/errorActions';

export default function createHandler(dispatch) {
    return function handleError(error) {
        console.error(error);
        if (error.response){//http response error
            //if (error.response.status === 401) { //unauthorized
            //    dispatch(authAction.logout());
            //}
            //else {
                dispatch(errorActions.setError(`[${error.response.status}]: ${error.response.statusText} ${error.response.url}`));
            //}
        }
        else {
            dispatch(errorActions.setError(error.toString()));
        }
    };
}