import TotalView from "./TotalView";
import MonthView from "./MonthView";
import MonthChart from "./MonthChart";

//View should be extended from BaseView
const views = {
    total: {
        label: 'Overall',
        component: TotalView
    },
    monthTable: {
        label: 'Monthly Table',
        component: MonthView
    },
    monthChart: {
        label: 'Monthly Chart',
        component: MonthChart
    }
};

export default views;