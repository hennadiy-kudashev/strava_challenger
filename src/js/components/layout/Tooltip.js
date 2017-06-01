import React, {PropTypes} from 'react';
import ReactTooltip from 'react-tooltip';

const Tooltip = ({children}) => {
    const key = Math.random().toString(16);//unique key
    return (
        <span>
            <i data-tip data-for={key} className="fa fa-fw fa-info-circle"/>
            <ReactTooltip id={key} place="right" type="dark" effect="solid">
                {children}
            </ReactTooltip>
        </span>
    );
};

Tooltip.propTypes = {
    children: PropTypes.array
};

export default Tooltip;