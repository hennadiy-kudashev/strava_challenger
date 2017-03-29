import TotalView from "./TotalView";
import MonthDistanceView from "./MonthDistanceView";
import MonthDistanceChart from './MonthDistanceChart';
import MonthClimbView from './MonthClimbView';
import MonthClimbChart from './MonthClimbChart';

const views = {
    total: {
        label: 'Overall',
        component: TotalView
    },
    monthDistanceTable: {
        label: 'Monthly Distances Table',
        component: MonthDistanceView
    },
    monthDistanceChart: {
        label: 'Monthly Distances Chart',
        component: MonthDistanceChart
    },
    monthClimbTable: {
        label: 'Monthly Climb Table',
        component: MonthClimbView
    },
    monthClimbChart: {
        label: 'Monthly Climb Chart',
        component: MonthClimbChart
    }
    
};

export default views;