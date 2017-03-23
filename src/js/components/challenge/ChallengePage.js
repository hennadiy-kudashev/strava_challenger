import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as challengeActions from "../../actions/challengeActions";
import TotalView from "./view/TotalView";
import MonthDistanceView from "./view/MonthDistanceView";
import Spinner from "../shared/Spinner";
import Grid from "../layout/Grid";
import Tabs from '../layout/tabs/Tabs';
import TabPane from '../layout/tabs/TabPane';

class ChallengePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(next){
        const {challenge, actions} = next;

        if (!challenge.isLoaded){
            actions.challengeActions.getChallenge(challenge.id, challenge.athletes, challenge.criteria);
        }
    }

    render() {
        const {challenge} = this.props;
        const labels = ['Overall', 'Monthly'];
        if (challenge && challenge.isLoaded) {
            return (
                <Tabs labels={labels}>
                    <TabPane>
                        <Grid title={challenge.displayName}>
                            <TotalView athletes={challenge.athletes}/>
                        </Grid>
                    </TabPane>
                    <TabPane>
                        <Grid title={challenge.displayName}>
                            <MonthDistanceView challenge={challenge}/>
                        </Grid>
                    </TabPane>
                </Tabs>
            );
        } else {
            return (<Spinner/>);
        }
    }
}

ChallengePage.propTypes = {
    challenge: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    let challengeID = ownProps.params.id;
    let challenge;
    if (challengeID && state.challenges.length > 0) {
        challenge = state.challenges.find(t => t.id === challengeID);
    }
    return {
        challenge: challenge
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            challengeActions: bindActionCreators(challengeActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengePage);
