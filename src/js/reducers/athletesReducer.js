import * as types from "../actions/actionTypes";

export default function athletesReducer(state = [], action) {
    switch (action.type) {
        case types.SET_CHALLENGE:
            return state.map((athlete, index) => {
                const userInfo = action.infoList[index];
                const activities = action.activitiesList[index].filter(a=> a.type == 'Run');
                return Object.assign({}, athlete, {
                    userInfo,
                    activities
                });
            });
        case types.JOIN_CHALLENGE:
            return [...state,
                {
                    id: action.athlete.id,
                    token: action.athlete.token,
                    activities: [],
                    userInfo: action.athlete
                }
            ];
        default:
            return state;
    }
}
