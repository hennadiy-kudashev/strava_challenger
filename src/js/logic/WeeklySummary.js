import moment from "moment";
import UnitSummary from "./UnitSummary";

class WeeklySummary extends UnitSummary {
  constructor(start, end, threshold) {
    super(start, end, threshold);
  }

  getPeriods() {
    let dateStart = moment(this.start);
    let dateEnd = moment(this.end);
    let weeks = [];

    while (dateEnd > dateStart) {
      weeks.push({
        start: dateStart.clone().startOf('week'),
        end: dateStart.clone().endOf('week'),
        label: `${dateStart.clone().startOf('week').format('DD')} - ${dateStart.clone().endOf('week').format('DD')} ${dateStart.clone().endOf('week').format('MMM')}`,
      });
      dateStart.add(1, 'week');
    }
    return weeks;
  }
}

export default WeeklySummary;
