import {Kilometre, Metre} from './format';

const thresholds= {
    distance: {
        label: 'Distance',
        component: Kilometre,
        unit: 'km',
        convert: metre => Math.round(metre / 1000)
    },
    total_elevation_gain: {
        label: 'Climb',
        component: Metre,
        unit: 'm',
        convert: metre => Math.round(metre)
    }
};

export default thresholds;