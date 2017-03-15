import * as types from './actionTypes';
import AthleteApi from '../api/athleteApi';

export function getStats(athletes) {
    return function (dispatch) {
        let athletesStats = athletes
            .map(athlete => new AthleteApi(athlete.token).getStats(athlete.id));

        return Promise.all(athletesStats).then(stats => {
            dispatch(setStats(stats));
        });
    };
}

export function setStats(stats) {
    return { type: types.SET_STATS, stats};
}


