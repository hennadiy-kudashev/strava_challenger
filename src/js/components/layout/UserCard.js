import React, {PropTypes} from 'react';

const UserCard = ({user}) => {
    const {avatar, fullName} = user;

    return (
        <a href="#">
            <img src={avatar} className="user-image" alt="User Image" />
            <span className="hidden-xs">{fullName}</span>
        </a>
    );
};

UserCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserCard;

