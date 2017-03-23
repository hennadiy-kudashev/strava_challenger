import React, {PropTypes} from 'react';

const TabPane = ({children}) => {
    return (
        <div className="tab-pane active">
            {children}
        </div>
    );
};

TabPane.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
};

export default TabPane;

