import React, {PropTypes} from "react";
import TotalSummary from "../../logic/totalSummary";
import PeriodSummary from "../../logic/periodSummary";
import thresholds from "./view/thresholds";

const Progress = ({challenge, user}) => {
    const joinedAthlete = challenge.athletes.find(a=>a.info.id === user.id);
    if (!joinedAthlete) {
        return (<div/>);
    }
    const thresholdCriteria = Object.keys(challenge.criteria.threshold)[0];
    const threshold = challenge.criteria.threshold[thresholdCriteria];
    const achieved = new TotalSummary(joinedAthlete.activities).getByCriterion(thresholdCriteria);
    const percentage = (achieved / threshold) * 100;
    const percentageLabel = percentage >= 100 ? `Completed: ${Math.round(percentage)}%` : Math.round(percentage) + '%';
    const periodSummary = new PeriodSummary(challenge.criteria.datetime.after, challenge.criteria.datetime.before);

    const label = thresholds[thresholdCriteria].label;
    const Component = thresholds[thresholdCriteria].component;
    return (
        <div className="progress-group">
            <span className="progress-text">{label}</span>
            <span className="progress-number"><b><Component unit={achieved}/></b>/<Component
                unit={threshold}/></span>
            <div className="progress">
                <div className="progress-bar progress-bar-primary progress-bar-striped"
                     style={{width: (percentage > 100 ? 100: percentage) + '%'}}>{percentageLabel}</div>
                &nbsp;
                <small>{periodSummary.getSummary()}</small>
            </div>
        </div>
    );
};

Progress.propTypes = {
    challenge: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default Progress;
