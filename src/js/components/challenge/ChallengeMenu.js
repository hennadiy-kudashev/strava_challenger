import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ChallengeMenuItem from "./ChallengeMenuItem";
import * as challengeActions from "../../actions/challengeActions";

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
        const joinedChallenges = challenges.filter(challenge=>challenge.athletes.some(athlete=>athlete.id == user.id));
        const openedChallenges = challenges.filter(challenge=>!challenge.athletes.some(athlete=>athlete.id == user.id));
        return (
            <ul className="sidebar-menu">
                <li className="header">JOINED CHALLENGES</li>
                {
                    joinedChallenges.map(challenge => {
                        const active = pathname.split('/').includes(challenge.id);
                        return <ChallengeMenuItem key={challenge.id} active={active} challenge={challenge}/>;

                    })
                }
                <li className="header">OPENED CHALLENGES</li>
                {
                    openedChallenges.map(challenge => {
                        const active = pathname.split('/').includes(challenge.id);
                        return <ChallengeMenuItem key={challenge.id} active={active} challenge={challenge}/>;

                    })
                }
            </ul>
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
