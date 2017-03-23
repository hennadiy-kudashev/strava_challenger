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
    
    const columns = ['Athlete'].concat(monthDistanceSummary.getMonths()).concat(['Total']);

    const rows = challenge.athletes.map((athlete, indexA)=> {
        const totalDistance = monthDistanceSummary.getTotalDistance(athlete.activities);
        return [
            <UserInfo key={indexA} userInfo={athlete.userInfo}/>,
            ...monthDistanceSummary.getMonthsDistance(athlete.activities)
                .map((obj, index)=><DistanceAndDiff key={index} distance={obj.distance} diff={obj.diff} />),
            <DistanceAndDiff key={indexA} distance={totalDistance.distance} diff={totalDistance.diff} />
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