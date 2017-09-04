import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ChallengeMenuItems from "./ChallengeMenuItems";
import * as challengeActions from "../../../actions/challengeActions";
import moment from 'moment';

class ChallengeMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const {actions} = this.props;
        actions.challengeActions.getChallenges();
    }

    render() {
        const {challenges, user, pathname} = this.props;
        const activeChallenges = challenges.filter(challenge=>moment().isBetween(moment(challenge.criteria.datetime.after),moment(challenge.criteria.datetime.before)));
        const joinedChallenges = activeChallenges.filter(challenge=>challenge.athletes.some(athlete=>athlete.id == user.id));
        const openedChallenges = activeChallenges.filter(challenge=>!challenge.athletes.some(athlete=>athlete.id == user.id));
        const closedChallenges = challenges.filter(challenge=>!moment().isBetween(moment(challenge.criteria.datetime.after),moment(challenge.criteria.datetime.before)));
        return (
            <div>
                <ChallengeMenuItems title="JOINED CHALLENGES" challenges={joinedChallenges} pathname={pathname} />
                <ChallengeMenuItems title="OPENED CHALLENGES" challenges={openedChallenges} pathname={pathname} />
                <ChallengeMenuItems title="CLOSED CHALLENGES" challenges={closedChallenges} pathname={pathname} />
            </div>
        );
    }
}

ChallengeMenu.propTypes = {
    challenges: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        challenges: state.challenges,
        user: state.auth.user,
        pathname: state.routing.locationBeforeTransitions.pathname
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            challengeActions: bindActionCreators(challengeActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeMenu);
