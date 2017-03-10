import React, {PropTypes} from "react";
import {connect} from "react-redux";
import ClubApi from "../../api/clubApi";
import MemberList from "./MemberList";
import * as clubActions from "../../actions/clubActions";
import {bindActionCreators} from "redux";
import Header from '../layout/Header';


class DashboardPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const {actions, auth} = this.props;
        if (auth.access_token) {
            let clubApi = ClubApi.createURunClub(auth.access_token);
            clubApi. getMembers().then(members=> {
                actions.clubMembersReceived(members);
            });
        }
    }

    render() {
        const {auth, members} = this.props;

        if (!auth.access_token) {
            return (<div>You should log in first.</div>);
        }
        else {
            return (
                <div>
                    <Header />
                    <MemberList members={members}/>
                </div>
            );
        }
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
