import React, {PropTypes} from 'react';
import { AppBar, Navigation } from 'react-toolbox';
import Logo from './Logo';
import AuthArea from '../auth/AuthArea';


const Header = () => {
    return (
        <header className="main-header">
          <a href="../../index2.html" className="logo">
            StravaChallenger
          </a>
          <nav className="navbar" role="navigation" style={{border: 0, maxHeight: 50}}>
            <a href="#" className="sidebar-toggle" role="button">
              <span className="sr-only">Toggle navigation</span>
            </a>
            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">
                <li className="dropdown messages-menu">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-envelope-o" />
                    <span className="label label-success">4</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="header">You have 4 messages</li>
                    <li>
                      <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: 200}}><ul className="menu" style={{overflow: 'hidden', width: '100%', height: 200}}>
                          <li>
                            <a href="#">
                              <div className="pull-left">
                                <img src="../dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                              </div>
                              <h4>
                                Support Team
                                <small><i className="fa fa-clock-o" /> 5 mins</small>
                              </h4>
                              <p>Why not buy a new awesome theme?</p>
                            </a>
                          </li>{/* end message */}
                        </ul></div>
                    </li>
                    <li className="footer"><a href="#">See All Messages</a></li>
                  </ul>
                </li>
                <li className="dropdown notifications-menu">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-bell-o" />
                    <span className="label label-warning">10</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="header">You have 10 notifications</li>
                    <li>
                      <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: 200}}><ul className="menu" style={{overflow: 'hidden', width: '100%', height: 200}}>
                          <li>
                            <a href="#">
                              <i className="fa fa-users text-aqua" /> 5 new members joined today
                            </a>
                          </li>
                        </ul></div>
                    </li>
                    <li className="footer"><a href="#">View all</a></li>
                  </ul>
                </li>
                <li className="dropdown tasks-menu">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-flag-o" />
                    <span className="label label-danger">9</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="header">You have 9 tasks</li>
                    <li>
                      <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: 200}}><ul className="menu" style={{overflow: 'hidden', width: '100%', height: 200}}>
                          <li>{/* Task item */}
                            <a href="#">
                              <h3>
                                Design some buttons
                                <small className="pull-right">20%</small>
                              </h3>
                              <div className="progress xs">
                                <div className="progress-bar progress-bar-aqua" style={{width: '20%'}} role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
                                  <span className="sr-only">20% Complete</span>
                                </div>
                              </div>
                            </a>
                          </li>{/* end task item */}
                        </ul><div className="slimScrollBar" style={{background: 'rgb(0, 0, 0)', width: 3, position: 'absolute', top: 0, opacity: '0.4', display: 'block', borderRadius: 7, zIndex: 99, right: 1}} /><div className="slimScrollRail" style={{width: 3, height: '100%', position: 'absolute', top: 0, display: 'none', borderRadius: 7, background: 'rgb(51, 51, 51)', opacity: '0.2', zIndex: 90, right: 1}} /></div>
                    </li>
                    <li className="footer">
                      <a href="#">View all tasks</a>
                    </li>
                  </ul>
                </li>
                <li className="dropdown user user-menu">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <img src="../dist/img/user2-160x160.jpg" className="user-image" alt="User Image" />
                    <span className="hidden-xs">Alexander Pierce</span>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="user-header">
                      <img src="../dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                      <p>
                        Alexander Pierce - Web Developer
                        <small>Member since Nov. 2012</small>
                      </p>
                    </li>
                    <li className="user-body">
                      <div className="col-xs-4 text-center">
                        <a href="#">Followers</a>
                      </div>
                      <div className="col-xs-4 text-center">
                        <a href="#">Sales</a>
                      </div>
                      <div className="col-xs-4 text-center">
                        <a href="#">Friends</a>
                      </div>
                    </li>
                    <li className="user-footer">
                      <div className="pull-left">
                        <a href="#" className="btn btn-default btn-flat">Profile</a>
                      </div>
                      <div className="pull-right">
                        <a href="#" className="btn btn-default btn-flat">Sign out</a>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </header>
    );
};

export default Header;
