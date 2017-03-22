import React, {PropTypes} from "react";
import UserInfo from "./UserInfo";
import Table from "../../layout/table/Table";
import TotalSummary from '../../../logic/totalSummary';
import {Kilometre, Metre, Time} from '../../../components/layout/format';

const TotalView = ({title, athletes}) => {
    const columns = ['Athlete', 'Runs', 'Distance', 'Elev Gain', 'Time'];

    const rows = athletes.map(athlete=> {
        const totalSummary = new TotalSummary(athlete.activities);
        return [
            <UserInfo key={athlete.userInfo.id} userInfo={athlete.userInfo}/>, 
            totalSummary.getRunCount(),
            <Kilometre metres={totalSummary.getDistance()} />,
            <Metre metres={totalSummary.getElevGain()} />,
            <Time seconds={totalSummary.getTime()} />
        ];
    });
    return (
        <Table columns={columns} rows={rows}/>
    );
};

TotalView.propTypes = {
    athletes: PropTypes.array.isRequired,
    title: PropTypes.string
};

export default TotalView;