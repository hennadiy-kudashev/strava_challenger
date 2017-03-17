import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Grid from '../layout/Grid';
import * as clubActions from "../../actions/clubActions";
import * as challengeActions from "../../actions/challengeActions";
import {bindActionCreators} from "redux";

class DashboardPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const {actions, currentChallenge} = this.props;
        // actions.clubActions.getClubMembers();

        const Yaro = {
            id: '18192624',
            token: '2d86cee021852379115518352e9f9596eed897e6'
        };
        const Gena = {
            id: '14419142',
            token: 'd7b559ae4e23f2e5eac0f47b9871a0c3f69bb4b3'
        };

        // actions.challengeActions.setChallenge(
        //     {
        //         id: 0,
        //         displayName: '2017 in 2017',
        //         athletes: []
        //     }
        // );
        // actions.challengeActions.followChallenge(0, Yaro);
        // actions.challengeActions.followChallenge(0, Gena);

        currentChallenge.athletes.forEach(athlete => {
            actions.challengeActions.getChallengeAthleteInfo(athlete);
        });

    }

    render() {
        const {members} = this.props;
        return (
            <Grid members={members}/>
        );
    }
}

DashboardPage.propTypes = {
    members: PropTypes.array.isRequired,
    challenges: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    currentChallenge: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        members: state.club.members,
        challenges: state.challenges,
        currentChallenge: state.currentChallenge
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            clubActions: bindActionCreators(clubActions, dispatch),
            challengeActions: bindActionCreators(challengeActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
