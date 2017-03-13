import React from 'react';

const Sidebar = () => {
    return (
        <div className="main-sidebar">
            <div className="sidebar">
                <ul className="sidebar-menu">
                    <li className="header">SHARED CHALLENGES</li>
                    <li className="active"><a href="#"><span>2017 in 2017</span></a></li>
                    <li className="header">PRIVATE CHALLENGES</li>
                    <li><a href="#"><span>My</span></a></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
