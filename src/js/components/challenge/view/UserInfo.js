import React, {PropTypes} from "react";

const UserInfo = ({userInfo}) => {
    return (
        <div className="user-block">
            <img src={userInfo.profile} className="img-circle img-bordered-sm" alt="User Image"/>
            <div className="username">
                {userInfo.firstname} {userInfo.lastname}
            </div>
            <div className="description">
                {userInfo.city}, {userInfo.state}, {userInfo.country}, {userInfo.id}
            </div>
        </div>);
};

UserInfo.propTypes = {
    userInfo: PropTypes.object.isRequired
};

export default UserInfo;