import BY from './thresholdBy';
import WeeklySummary from "../../../logic/WeeklySummary";
import MonthSummary from "../../../logic/MonthSummary";

const thresholdBy = {
  [BY.TOTAL]: {
    label: 'for all period',
  },
  [BY.WEEK]: {
    label: 'by week',
    summaryClass: WeeklySummary,
  },
  [BY.MONTH]: {
    label: 'by month',
    summaryClass: MonthSummary,
  }
};

export default thresholdBy;
