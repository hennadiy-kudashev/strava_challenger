import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Divider = ({ toggleSidebar, open }) => {
  return (
    <div className="divider">
      <button className="divider-btn" onClick={toggleSidebar}>
        <i className={cx("fa", { 'fa-angle-right': !open, 'fa-angle-left': open })}/>
      </button>
    </div>
  );
};

Divider.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Divider;
