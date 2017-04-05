import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as challengeActions from "../../actions/challengeActions";
import List from '../layout/list/List';

class DashboardPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {challenges, user} = this.props;

        return (
            <div className="content">
                <List challenges={challenges} user={user} />
            </div>
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
