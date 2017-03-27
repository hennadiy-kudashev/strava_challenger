import {Kilometre, Metre} from '../../layout/format';

const thresholds= {
    distance: {
        label: 'Distance',
        component: Kilometre
    },
    total_elevation_gain: {
        label: 'Climb',
        component: Metre
    }
};

export default thresholds;