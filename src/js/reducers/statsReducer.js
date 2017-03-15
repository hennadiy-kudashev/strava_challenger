import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";


export default function statsReducer(state = initialState.stats, action) {
    switch (action.type) {
        case types.SET_STATS:
          return [...action.stats];
        default:
            return state;
    }
}
