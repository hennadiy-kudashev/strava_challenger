import React, { Component, PropTypes } from 'react';
import { AppBar } from 'react-toolbox';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as pageActions from '../actions/PageActions';


class App extends Component {
    render() {
        return (
            <div className='main'>
                <AppBar title='U-Run' />
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

// function mapStateToProps (state) {
//     return {
//         // user: state.user,
//         // page: state.page
//     };
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         pageActions: bindActionCreators(pageActions, dispatch)
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
