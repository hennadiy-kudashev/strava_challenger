import React, { Component, PropTypes } from 'react';
import Header from './layout/Header';
import AuthArea from './auth/AuthArea';

class App extends Component {
    render() {
        return (
            <div className="skin-yellow-light" >
                <div className="wrapper">
                    {this.props.children}
                    <footer className="main-footer">Powered by Strava</footer>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
