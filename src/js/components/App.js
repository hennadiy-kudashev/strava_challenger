import React, { Component, PropTypes } from 'react';
import { AppBar } from 'react-toolbox';
import Logo from './layout/Logo';

class App extends Component {
    render() {
        return (
            <div className='main'>
                <AppBar>
                    <Logo />
                </AppBar>
                <div className='content'>
                    {this.props.children}
                </div>
                <div className='footer'>Powered by Strava</div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
