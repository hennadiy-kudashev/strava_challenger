import TotalView from "./TotalView";
import MonthDistanceView from "./MonthDistanceView";
import MonthDistanceChart from './MonthDistanceChart';

const views = {
    total: {
        label: 'Overall',
        component: TotalView
    },
    monthDistance: {
        label: 'Monthly Distances',
        component: MonthDistanceView
    },
    monthDistanceChart: {
        label: 'Monthly Distances Chart',
        component: MonthDistanceChart
    }
};

export default views;