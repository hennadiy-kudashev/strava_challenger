import React, {PropTypes} from 'react';
import TotalSummary from '../../logic/totalSummary';
import {Kilometre} from '../layout/format';

const Progress = ({challenge}) => {
    const thresholdCriteria = Object.keys(challenge.criteria.threshold)[0];
    const threshold = challenge.criteria.threshold[thresholdCriteria];
    const achieved = new TotalSummary(challenge.athletes.find(a=>a.id == 14419142).activities).getByCriterion(thresholdCriteria);
    const percentage = (achieved/threshold) * 100;
    return (
        <div className="progress-group">
            <span className="progress-text">{thresholdCriteria}</span>
            <span className="progress-number"><b><Kilometre metres={achieved}/></b>/<Kilometre metres={threshold}/></span>

            <div className="progress sm">
                <div className="progress-bar progress-bar-yellow" style={{width: percentage + '%'}}></div>
            </div>
        </div>
    );
};

Progress.propTypes = {
    challenge: PropTypes.object.isRequired
};

export default Progress;