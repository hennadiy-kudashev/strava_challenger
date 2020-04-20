import moment from "moment";
import UnitSummary from "./UnitSummary";

class MonthSummary extends UnitSummary {
  constructor(start, end, threshold, by, minActivities) {
    super(start, end, threshold, by, minActivities);
  }

  getPeriods() {
    let dateStart = moment(this.start);
    let dateEnd = moment(this.end);
    let months = [];

    while (dateEnd > dateStart) {
      months.push({
        start: dateStart.clone().startOf('month'),
        end: dateStart.clone().endOf('month'),
        label: dateStart.format('MMMM')
      });
      dateStart.add(1, 'month');
    }
    return months;
  }
}

export default MonthSummary;
