import React, {PropTypes} from 'react';

const UserCard = ({user}) => {
    const {profile, firstname, lastname} = user;

    return (
        <a href="#">
            <img src={profile} className="user-image" alt="User Image" />
            <span className="hidden-xs">{firstname} {lastname}</span>
        </a>
    );
};

UserCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserCard;

