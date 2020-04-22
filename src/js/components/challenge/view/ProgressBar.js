import React, { PropTypes } from "react";

const ProgressBar = ({ label, achieved, threshold, Component, summary, isFailed }) => {
  const percentage = Math.round((achieved / threshold) * 100);
  const percentageLabel = percentage >= 100 ? `Completed: ${percentage}%` : (`${isFailed ? 'Failed: ' : ''}${percentage}%`);
  const className = isFailed ?  "progress-bar-failed": "progress-bar-primary";
  return (
    <div className="progress-group">
      <span className="progress-text">{label}</span>
      <span className="progress-number"><b><Component unit={achieved}/></b>/<Component
        unit={threshold}/></span>
      <div className="progress">
        <div className={"progress-bar progress-bar-striped " + className}
             style={{ width: (percentage > 100 ? 100 : percentage) + '%' }}>{percentageLabel}</div>
        &nbsp;
        <small>{summary}</small>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  achieved: PropTypes.number.isRequired,
  threshold: PropTypes.number.isRequired,
  Component: PropTypes.func.isRequired,
  summary: PropTypes.string.isRequired,
  isFailed: PropTypes.bool.isRequired,
};

export default ProgressBar;
