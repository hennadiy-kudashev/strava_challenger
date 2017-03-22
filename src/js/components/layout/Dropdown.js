import React, {PropTypes} from 'react';

const Dropdown = ({user}) => {
    const {avatar, fullName} = user;

    return (
        <ul className="dropdown-menu">
            <li className="user-header">
                <img src={avatar} className="img-circle" alt="User Image" />
                <p>
                    {fullName}
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

