import * as types from "../actions/actionTypes";

export default function athletesReducer(state = [], action) {
    switch (action.type) {
        case types.SET_CHALLENGE_ATHLETE_INFO:
            return state.map(athlete => {
                if (athlete.id === action.athleteId) {
                    const {firstname, lastname, profile} = action.info;

                    return Object.assign({}, athlete, {
                        userInfo: {
                            lastname,
                            firstname,
                            profile
                        }
                    });
                }
                return athlete;
            });
        case types.SET_CHALLENGE_ATHLETE_ACTIVITIES:
            return state.map(athlete => {
                if (athlete.id === action.athleteId) {
                    return Object.assign({}, athlete, {
                        activities: action.activities
                    });
                }
                return athlete;
            });
        case types.SET_CHALLENGE:
            return state.map((athlete, index) => {
                //const userInfo = action.infoList.find(i=>i.id === athlete.id);
                const userInfo = action.infoList[index];
                const activities = action.activitiesList[index].filter(a=> a.type == 'Run');
                return Object.assign({}, athlete, {
                    userInfo,
                    activities
                });
            });
        default:
            return state;
    }
}
