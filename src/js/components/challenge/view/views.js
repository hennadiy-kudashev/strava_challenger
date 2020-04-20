import TotalTable from "./TotalTable";
import MonthTable from "./MonthTable";
import MonthChart from "./MonthChart";
import WeeklyTable from "./WeeklyTable";
import WeeklyChart from "./WeeklyChart";
import ActivityTypesTable from "./ActivityTypesTable";

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
    },
    weeklyTable: {
        label: 'Weekly Table',
        component: WeeklyTable
    },
    weeklyChart: {
        label: 'Weekly Chart',
        component: WeeklyChart
    },
    activityTypes: {
        label: 'Activity Types',
        component: ActivityTypesTable
    },
};

export default views;
