import React, { PropTypes } from 'react';
import { connect  } from 'react-redux';
import classnames from 'classnames';
import Logo from './Logo';
import UserCard from './UserCard';
import Dropdown from './Dropdown';
import Error from './Error';
import { canCreateChallenge} from '../../logic/admin';
import { Link } from 'react-router';

class Header extends React.Component  {
    constructor(props, context) {
        super(props);
        this.state = {open: false};
        this.dropdownToggle = this.dropdownToggle.bind(this);
    }

    dropdownToggle() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const {user, toggleSidebar} = this.props;

        return (
            <header className="main-header">
                <Logo />
                <Error />
                <nav className="navbar" role="navigation">
                    <a href="#" className="sidebar-toggle" role="button" onClick={toggleSidebar}>
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="collapse navbar-collapse pull-left" id="navbar-collapse">
                        {user.id && canCreateChallenge(user.id) && <ul className="nav navbar-nav">
                            <li><Link to="/challenge/create">Create</Link></li>
                        </ul>}
                    </div>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className={classnames('dropdown', 'user', 'user-menu', {'open': this.state.open})}
                                onClick={this.dropdownToggle}>
                                <UserCard user={user}/>
                                <Dropdown user={user}/>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

Header.propTypes = {
    user: PropTypes.object.isRequired,
    toggleSidebar: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.auth.user
    };
}

export default connect(mapStateToProps)(Header);
