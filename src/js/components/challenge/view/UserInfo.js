import React, { PropTypes } from "react";

const UserInfo = ({ userInfo }) => {
  return (
    <div className="user-block">
      <img src={userInfo.profile} className="img-circle img-bordered-sm" alt="User Image"/>
      <a className="username" target="_blank" href={`https://www.strava.com/athletes/${userInfo.id}`}>
        {userInfo.firstname} {userInfo.lastname}
      </a>
      <div className="description">
        {[userInfo.city, userInfo.state, userInfo.country].join(', ')}
      </div>
    </div>);
};

UserInfo.propTypes = {
  userInfo: PropTypes.object.isRequired
};

export default UserInfo;
