import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

export default function athletesReducer(state = [], action) {
    switch (action.type) {
          case types.SET_CHALLENGE_ATHLETE_INFO:
            return state.map(athlete => {
                    if (athlete.id === action.athleteId) {
                        return Object.assign({}, athlete, {
                            userInfo: action.info
                        });
                    }
                    return athlete;

            });
        case types.SET_CHALLENGE_ATHLETE_ACTIVITIES:
            // TODO: get user activities
            // return state.map(athlete => {
            //         if (athlete.id === action.athleteId) {
            //             return Object.assign({}, athlete, {
            //                 userInfo: action.info
            //             });
            //         }
            //         return athlete;
            // });
            return state;
        default:
            return state;
    }
}
