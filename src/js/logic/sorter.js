import TotalSummary from './totalSummary';

class Sorter {
    constructor(criterion){
        this.criterion = criterion;
    }

    getSortFn(){
        const criterion = this.criterion;
        return function (athlete1, athlete2) {
            const total1 = new TotalSummary(athlete1.activities);
            const total2 = new TotalSummary(athlete2.activities);
            return total2.getByCriterion(criterion) - total1.getByCriterion(criterion);
        };
    }
}

export default Sorter;