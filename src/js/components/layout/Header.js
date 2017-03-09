import React, {PropTypes} from 'react';
import { AppBar, Navigation } from 'react-toolbox';
import Logo from './Logo';
import AuthArea from '../auth/AuthArea';


const Header = () => {
    return (
        <header className="main-header">
            <a href="#" className="logo">
                StravaChallenger
            </a>
            <nav className="navbar" role="navigation">
                <a href="#" className="sidebar-toggle" role="button">
                    <span className="sr-only">Toggle navigation</span>
                </a>
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <li className="dropdown user user-menu">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <img src="../dist/img/user2-160x160.jpg" className="user-image" alt="User Image" />
                                <span className="hidden-xs">Alexander Pierce</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
