import React from 'react';

const Sidebar = () => {
    return (
        <div className="main-sidebar">
            <div className="sidebar">
                <ul className="sidebar-menu">
                    <li className="header">HEADER</li>
                    <li className="active"><a href="#"><span>Link</span></a></li>
                    <li><a href="#"><span>Link</span></a></li>
                    <li><a href="#"><span>Link</span></a></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
