import React, {PropTypes} from "react";
import UserInfo from "./UserInfo";
import Table from "../../layout/table/Table";
import MonthSummary from '../../../logic/monthSummary';
import {Diff} from './format';

const MonthView = ({challenge, criterion}) => {
    const monthSummary = new MonthSummary(
        challenge.criteria.datetime.after,
        challenge.criteria.datetime.before,
        challenge.criteria.threshold[criterion]);
    
    const columns = ['Athlete'].concat(monthSummary.getMonths()).concat(['Total']);

    const rows = challenge.athletes.map((athlete, indexA)=> {
        const total = monthSummary.getTotal(athlete.activities, criterion);
        return [
            <UserInfo key={indexA} userInfo={athlete.userInfo}/>,
            ...monthSummary.getMonthsDiff(athlete.activities, criterion)
                .map((obj, index)=><Diff key={index} total={obj.monthTotal} diff={obj.monthDiff} criterion={criterion} />),
            <Diff key={indexA} total={total.total} diff={total.diff} criterion={criterion} />
        ];
    });
    return (
        <Table columns={columns} rows={rows}/>
    );
};

MonthView.propTypes = {
    challenge: PropTypes.object.isRequired,
    criterion: PropTypes.string.isRequired
};

export default MonthView;