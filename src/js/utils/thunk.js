import isPromise from './isPromise';
import * as authAction from '../actions/authActions';

export default function thunk({dispatch, getState}) {
    return next => action => {
        if (typeof action === 'function') {
            let potentialPromise = action(dispatch, getState);
            if (isPromise(potentialPromise)) {
                potentialPromise.catch(error=> {
                    if (error.status === 401){
                        dispatch(authAction.logout());
                    }
                    else{
                        console.error('Caught an exception!', error);
                    }
                });
            }
        } else {
            next(action);
        }
    };
}