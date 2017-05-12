import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as challengeActions from "../../actions/challengeActions";
import List from "../layout/list/List";
import Box from "../layout/Box";
import Intro from './Intro';

class DashboardPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {challenges, user} = this.props;

        return (
            <Box title="Dashboard">
                <Intro />
                <h4 className="box-title">List of Challenges</h4>
                <List challenges={challenges} user={user}/>
            </Box>
        );
    }
}

DashboardPage.propTypes = {
    challenges: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        challenges: state.challenges,
        user: state.auth.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            challengeActions: bindActionCreators(challengeActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
