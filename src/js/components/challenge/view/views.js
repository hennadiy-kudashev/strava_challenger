import TotalTable from "./TotalTable";
import MonthTable from "./MonthTable";
import MonthChart from "./MonthChart";

//View should be extended from BaseView
const views = {
    total: {
        label: 'Overall',
        component: TotalTable
    },
    monthTable: {
        label: 'Monthly Table',
        component: MonthTable
    },
    monthChart: {
        label: 'Monthly Chart',
        component: MonthChart
    }
};

export default views;