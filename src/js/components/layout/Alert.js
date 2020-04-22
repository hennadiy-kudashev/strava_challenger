import React, { PropTypes } from "react";

const Alert = ({ title, children }) => {
  return (
    <div className="content">
      <div className="callout callout-danger">
        <h4 className="box-title">{title}</h4>
        <p>{children}</p>
      </div>
    </div>
  )
    ;
};

Alert.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

export default Alert;
