import React from 'react';
import oauthApi from '../../api/oauthApi';

const LoginButton = () => {
    const redirectURL = `${window.location.origin}/code_receiver`;
    const url = oauthApi.getAuthorizeURL(redirectURL);
    return (
        <div className="login">
            <a href={url} className="login-btn"/>
        </div>);
};
export default LoginButton;
