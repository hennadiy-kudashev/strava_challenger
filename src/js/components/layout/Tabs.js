import React, {PropTypes} from 'react';
import TabNav from './tabs/TabNav';
import TabPane from './tabs/TabPane';

const Tabs = ({children}) => {

    return (
        <div className="nav-tabs-custom">
            <TabNav />
            <div className="tab-content">
                <TabPane />
            </div>
        </div>
    );
};

Tabs.propTypes = {
    children: PropTypes.array
};

export default Tabs;

