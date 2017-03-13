import React, {PropTypes} from "react";
import {connect} from "react-redux";
import MemberList from "./MemberList";
import * as clubActions from "../../actions/clubActions";
import {bindActionCreators} from "redux";
import {browserHistory} from "react-router";


class DashboardPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const {actions, auth} = this.props;
        if (auth.isAuthenticated) {
            actions.getClubMembers();
        }else{
            browserHistory.push('/');
        }
    }

    render() {
        const {members} = this.props;
        return (
            <div>
                <MemberList members={members}/>
            </div>
        );
    }
}

DashboardPage.propTypes = {
    auth: PropTypes.object.isRequired,
    members: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        auth: state.auth,
        members: state.club.members
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(clubActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
