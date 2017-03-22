import * as types from "../actions/actionTypes";

export default function athletesReducer(state = [], action) {
    switch (action.type) {
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
