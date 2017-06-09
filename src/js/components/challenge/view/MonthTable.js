import React, {PropTypes} from "react";
import UserInfo from "./UserInfo";
import Table from "../../layout/table/Table";
import MonthSummary from '../../../logic/monthSummary';
import {Diff, Unit} from './format';
import BaseView from './BaseView';
import Tooltip from '../../layout/Tooltip';

class MonthTable extends BaseView{
    constructor(props, context) {
        super(props, context);
    }
    render(){
        const monthSummary = new MonthSummary(
            this.getChallenge().criteria.datetime.after,
            this.getChallenge().criteria.datetime.before,
            this.getChallenge().criteria.threshold[this.getThresholdCriterion()]);

        const columns = ['Athlete'].concat(monthSummary.getMonths()).concat(['Total']);
        
        const rows = super.getSortedAthletes().map((athlete, indexA)=> {
            const total = monthSummary.getTotal(athlete.activities, this.getThresholdCriterion());
            return [
                <UserInfo key={indexA} userInfo={athlete.userInfo}/>,
                ...monthSummary.getMonthsDiff(athlete.activities, this.getThresholdCriterion())
                    .map((obj, index)=><Diff key={index} total={obj.monthTotal} diff={obj.monthDiff} criterion={this.getThresholdCriterion()} />),
                <Diff key={indexA} total={total.total} diff={total.diff} criterion={this.getThresholdCriterion()} />
            ];
        });
        rows.unshift([
            <span key="tooltip">Norm<Tooltip>
                <div>Norm for a past month - norm of a day * number of days in month.</div>
                <div>Norm for the current month - norm of a day * past days in the month by now.</div>
                <div>Colored values display the difference between norm and actual data.</div>
            </Tooltip></span>,
            ...monthSummary.getMonthsNorm().map((obj, index)=><Unit key={index} unit={obj} criterion={this.getThresholdCriterion()}/>),
            <Unit key="norm" unit={monthSummary.getNormByNow()} criterion={this.getThresholdCriterion()}/>
        ]);
        
        return (<Table columns={columns} rows={rows}/>);
    }
}

export default MonthTable;