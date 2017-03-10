import React from 'react';

const Sidebar = () => {
    return (
        <div className="main-sidebar">
            <div className="sidebar">
                <div className="user-panel">
                    <div className="pull-left image">
                        <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                    </div>
                    <div className="pull-left info">
                        <p>User Name</p>
                        <a href="#"><i className="fa fa-circle text-success" /> Online</a>
                    </div>
                </div>
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
