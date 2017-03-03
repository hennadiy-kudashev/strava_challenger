import React, {PropTypes} from 'react';
import { AppBar, Navigation } from 'react-toolbox';
import Logo from './Logo';
import AuthArea from '../auth/AuthArea';


const Header = () => {
    return (
        <AppBar title="U-Run" leftIcon={<Logo />}>
            <Navigation type="horizontal">
                <AuthArea />
            </Navigation>
        </AppBar>
    );
};

export default Header;