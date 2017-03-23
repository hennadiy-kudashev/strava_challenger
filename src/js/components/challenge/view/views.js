import TotalView from "./TotalView";
import MonthDistanceView from "./MonthDistanceView";

const views = {
    total: {
        label: 'Overall',
        component: TotalView
    },
    monthDistance: {
        label: 'Monthly Distances',
        component: MonthDistanceView
    }
};

export default views;