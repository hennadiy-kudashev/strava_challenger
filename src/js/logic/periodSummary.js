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
        //use true to return float number, which is more precise to count days in month
        return this.end.diff(this.now, 'days', true);
    }

    getDaysPast(){
        //use true to return float number, which is more precise to count the norm in the first day of month
        return this.now.diff(this.start, 'days', true);
    }
    
    getDays(){
        //use true to return float number, which is more precise to count days in month
        return this.end.diff(this.start, 'days', true);
    }

    getSummary(){
        if (this.isNotStarted()){
            return 'Not Started';
        }
        if (this.isEnded()){
            return 'Ended';
        }
        return `${Math.round(this.getDaysLeft())} Days Left`;

    }
}

export default PeriodSummary;