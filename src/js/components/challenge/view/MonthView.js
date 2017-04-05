import React, {PropTypes} from "react";
import UserInfo from "./UserInfo";
import Table from "../../layout/table/Table";
import MonthSummary from '../../../logic/monthSummary';
import {Diff} from './format';
import BaseView from './BaseView';

class MonthView extends BaseView{
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
        return (
            <Table columns={columns} rows={rows}/>
        );
    }
}

export default MonthView;