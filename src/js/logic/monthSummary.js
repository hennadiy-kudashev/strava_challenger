import moment from "moment";
import TotalSummary from "./totalSummary";

class MonthSummary {
    constructor(start, end, threshold) {
        this.start = start;
        this.end = end;
        this.threshold = threshold;
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

    getMonthsDiff(activities, criterion) {
        const months = this._getMonths();
        const monthThreshold = this.threshold / months.length;
        return months
            .map(month=> {
                return TotalSummary.create(activities, month.start, month.end).getByCriterion(criterion);
            })
            .map(monthTotal=> {
                return {
                    monthTotal: monthTotal,
                    monthDiff: monthTotal - monthThreshold,
                    monthThreshold: monthThreshold
                };
            });
    }

    getTotal(activities, criterion) {
        const total = TotalSummary.create(activities, this.start, this.end).getByCriterion(criterion);
        return {
            total: total,
            diff: total - this.threshold
        };
    }
}

export default MonthSummary;