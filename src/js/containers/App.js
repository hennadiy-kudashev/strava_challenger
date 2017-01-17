import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import User from '../components/User'
// import Page from '../components/Page'
// import * as pageActions from '../actions/PageActions';

import { AppBar } from 'react-toolbox';
import { Layout, NavDrawer, Panel } from 'react-toolbox';

class App extends Component {
    state = {
        drawerActive: false,
        drawerPinned: false,
        sidebarPinned: false
    };

    toggleDrawerActive = () => {
        this.setState({ drawerActive: !this.state.drawerActive });
    };

    toggleDrawerPinned = () => {
        this.setState({ drawerPinned: !this.state.drawerPinned });
    }

    toggleSidebar = () => {
        this.setState({ sidebarPinned: !this.state.sidebarPinned });
    };

    render() {
        return (
            <Layout>
                <NavDrawer active={this.state.drawerActive}
                    pinned={this.state.drawerPinned} permanentAt='l'
                    onOverlayClick={ this.toggleDrawerActive }>
                    <p>
                        Navigation, account switcher, etc. go here.
                    </p>
                </NavDrawer>
                <Panel>
                    <AppBar leftIcon='menu' onLeftIconClick={ this.toggleDrawerActive } />
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                        <h1>Main Content</h1>
                        <p>Main content goes here.</p>
                    </div>
                </Panel>
            </Layout>
        );
    }
}

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
