import moment from "moment";
import TotalSummary from "./totalSummary";

class MonthDistanceSummary {
    constructor(start, end, distance) {
        this.start = start;
        this.end = end;
        this.distance = distance;
    }

    _getMonths() {
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

    getMonths() {
        return this._getMonths().map(m=>m.label);
    }

    getMonthsDistance(activities) {
        const months = this._getMonths();
        const monthDistance = this.distance / months.length;
        return months
            .map(month=> {
                return TotalSummary.create(activities, month.start, month.end).getDistance();
            })
            .map(distance=> {
                return {
                    distance,
                    diff: distance - monthDistance
                }
            });
    }
}

export default MonthDistanceSummary;