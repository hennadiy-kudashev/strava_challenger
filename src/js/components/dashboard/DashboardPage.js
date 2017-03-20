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
        actions.clubActions.getClubMembers();

        actions.challengeActions.createChallenge(
            {
                id: 0,
                displayName: '2017 in 2019',
                athletes: []
            }
        );

        currentChallenge.athletes.forEach(athlete => {
            actions.challengeActions.getChallengeAthleteInfo(athlete);
            actions.challengeActions.getChallengeAthleteActivities(athlete);
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
