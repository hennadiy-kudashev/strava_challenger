import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ChallengeMenuItem from './ChallengeMenuItem';
import * as challengeActions from '../../actions/challengeActions';

class ChallengeMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const {actions} = this.props;
        actions.challengeActions.getChallenges();
    }

    render() {
        const {challenges} = this.props;
        return (
            <ul className="sidebar-menu">
                <li className="header">CHALLENGES</li>
                {challenges.map(challenge => <ChallengeMenuItem key={challenge.id} active={false} challenge={challenge} />)}
            </ul>
        );
    }
}

ChallengeMenu.propTypes = {
    challenges: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        challenges: state.challenges
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