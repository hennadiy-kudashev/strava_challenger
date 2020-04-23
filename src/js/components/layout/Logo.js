import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';

const getLogo = () => {
  try {
    return require('../../../resources/images/logo.jpg');
  } catch (e) {
    return null;
  }
};

const Logo = () => {
  const logo = getLogo();
  return (
    <Link to="/dashboard" className={cx("logo", { 'logo-without-img': !logo })}>
      {logo && <img className="logo_img" src={logo}/>}
      StravaChallenger
    </Link>
  );
};

export default Logo;
