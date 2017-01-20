import React from 'react'

const Login = () => (
    <div className='login'>
        <a href='https://www.strava.com/oauth/authorize?client_id=15685&redirect_uri=http://localhost:3000/token_exchange&response_type=code' className='login-btn'></a>
    </div>
);

export default Login;
