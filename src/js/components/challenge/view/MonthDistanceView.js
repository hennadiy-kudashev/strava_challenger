import React, {PropTypes} from "react";
import UserInfo from "./UserInfo";
import Table from "../../layout/table/Table";
import MonthDistanceSummary from '../../../logic/monthDistanceSummary';
import {DistanceAndDiff} from '../../../components/layout/format';

const MonthDistanceView = ({challenge}) => {
    const monthDistanceSummary = new MonthDistanceSummary(
        challenge.criteria.datetime.after,
        challenge.criteria.datetime.before,
        2017000);
    
    const columns = ['Athlete'].concat(monthDistanceSummary.getMonths());

    const rows = challenge.athletes.map(athlete=> {
        return [
            (<UserInfo key={athlete.userInfo.id} userInfo={athlete.userInfo}/>), 
            ...monthDistanceSummary.getMonthsDistance(athlete.activities)
                .map(obj=><DistanceAndDiff distance={obj.distance} diff={obj.diff} />)
        ];
    });
    return (
        <Table columns={columns} rows={rows}/>
    );
};

MonthDistanceView.propTypes = {
    challenge: PropTypes.object.isRequired
};

export default MonthDistanceView;