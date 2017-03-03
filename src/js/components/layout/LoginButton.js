import React from 'react';
import oauthApi from '../../api/oauthApi';

const LoginButton = () => {
    const redirectURL = `${window.location.origin}/code_receiver`;
    const url = oauthApi.getAuthorizeURL(redirectURL);
    return (<a href={url} className="login-btn"/>);
};
export default LoginButton;
