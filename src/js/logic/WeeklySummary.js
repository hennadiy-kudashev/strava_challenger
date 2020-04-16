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
      let weekStart = dateStart.clone().startOf('week');
      if (weekStart.isBefore(moment(this.start))){
        weekStart = moment(this.start);
      }
      let weekEnd = dateStart.clone().endOf('week');
      if (weekEnd.isAfter(moment(this.end))){
        weekEnd = moment(this.end);
      }
      weeks.push({
        start: weekStart,
        end: weekEnd,
        label: `${weekStart.format('DD')} - ${weekEnd.format('DD')} ${weekEnd.format('MMM')}`,
      });
      dateStart.add(1, 'week');
    }
    return weeks;
  }
}

export default WeeklySummary;
