import React, {PropTypes} from 'react';

const Dropdown = ({user}) => {
    const {profile, firstname, lastname} = user;

    return (
        <ul className="dropdown-menu">
            <li className="user-header">
                <img src={profile} className="img-circle" alt="User Image" />
                <p>
                    {firstname} {lastname}
                </p>
            </li>
            <li className="user-footer">
                <div className="pull-right">
                    <a href="#" className="btn btn-default btn-flat">Sign out</a>
                </div>
            </li>
        </ul>
    );
};

Dropdown.propTypes = {
    user: PropTypes.object.isRequired
};

export default Dropdown;

