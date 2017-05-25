import moment from "moment";

class PeriodSummary {
    constructor(start, end) {
        this.start = moment(start);
        this.end = moment(end);
        this.now = moment();
    }

    isNotStarted(){
        return this.now.isBefore(this.start);
    }

    isEnded(){
        return this.now.isAfter(this.end);
    }

    isBetween(){
        return this.now.isBetween(this.start, this.end);
    }

    getDaysLeft(){
        return this.end.diff(this.now, 'days');
    }

    getDaysPast(){
        return this.now.diff(this.start, 'days');
    }

    getSummary(){
        if (this.isNotStarted()){
            return 'Not Started';
        }
        if (this.isEnded()){
            return 'Ended';
        }
        return `${this.getDaysLeft()} Days Left`;

    }
}

export default PeriodSummary;