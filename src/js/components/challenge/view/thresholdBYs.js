import BY from './thresholdBy';
import WeeklySummary from "../../../logic/WeeklySummary";
import MonthSummary from "../../../logic/MonthSummary";

const thresholdBy = {
  [BY.TOTAL]: {
    label: 'for all period',
  },
  [BY.WEEK]: {
    label: 'per week',
    summaryClass: WeeklySummary,
  },
  [BY.MONTH]: {
    label: 'per month',
    summaryClass: MonthSummary,
  }
};

export default thresholdBy;
