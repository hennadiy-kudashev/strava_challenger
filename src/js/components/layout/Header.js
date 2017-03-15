import React from 'react';
import Logo from './Logo';
import UserCard from './UserCard';
import Error from './Error';

const Header = () => {
    return (
        <header className="main-header">
            <Logo />
            <Error />
            <nav className="navbar" role="navigation">
                <a href="#" className="sidebar-toggle" role="button">
                    <span className="sr-only">Toggle navigation</span>
                </a>
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <li className="dropdown user user-menu">
                            <UserCard />
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
