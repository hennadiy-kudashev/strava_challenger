import isPromise from "./isPromise";
import createHandler from "./errorHandler";

export default function thunk({dispatch, getState}) {
    return next => action => {
        if (typeof action === 'function') {
            let potentialPromise = action(dispatch, getState);
            if (isPromise(potentialPromise)) {
                potentialPromise.catch(createHandler(dispatch));
            }
        } else {
            next(action);
        }
    };
}