import React, {PropTypes} from "react";
import UserInfo from "./UserInfo";
import Grid from "../../layout/Grid";
import TotalSummary from '../../../logic/totalSummary';

const TotalView = ({title, athletes}) => {
    const columns = ['Athlete', 'Runs', 'Distance', 'Elev Gain', 'Time'];

    const rows = athletes.map(a=> {
        const totalSummary = new TotalSummary(a.activities);
        return [
            (<UserInfo userInfo={a.userInfo}/>), 
            totalSummary.getRunCount(), 
            totalSummary.getDistance(), 
            totalSummary.getElevGain(),
            totalSummary.getTime()
        ];
    });
    return (
        <Grid title={title} columns={columns} rows={rows}/>
    );
};

TotalView.propTypes = {
    athletes: PropTypes.array.isRequired,
    title: PropTypes.string
};

export default TotalView;