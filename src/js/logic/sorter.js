import TotalSummary from './totalSummary';
import { SORT_DIRECTION } from "../components/layout/table/Table";

class Sorter {
  constructor(criterion, direction = SORT_DIRECTION.DESC, start, end) {
    this.criterion = criterion;
    this.direction = direction;
    this.start = start;
    this.end = end;
  }

  getSortFn() {
    const criterion = this.criterion;
    const direction = this.direction;
    const start = this.start;
    const end = this.end;
    return function (athlete1, athlete2) {
      const total1 = start ? TotalSummary.create(athlete1.activities, start, end) : new TotalSummary(athlete1.activities);
      const total2 = start ? TotalSummary.create(athlete2.activities, start, end) : new TotalSummary(athlete2.activities);
      const value1 = criterion === 'count' ? total1.getRunCount() : total1.getByCriterion(criterion);
      const value2 = criterion === 'count' ? total2.getRunCount() : total2.getByCriterion(criterion);
      if (direction === SORT_DIRECTION.DESC) {
        return value2 - value1;
      } else {
        return value1 - value2;
      }

    };
  }
}

export default Sorter;
