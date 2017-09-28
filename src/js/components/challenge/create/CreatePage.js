import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as challengeActions from "../../../actions/challengeActions";
import Box from "../../layout/Box";
import views from "../view/views";
import thresholds from "../view/thresholds";
import DateTimeRangeControl from "../../shared/DateTimeRangeControl";
import SelectableTextControl from "../../shared/SelectableTextControl";
import CheckboxList from "../../shared/CheckboxList";
import moment from "moment";
import {FormGroup, FormControl, ControlLabel, Checkbox, Button} from "react-bootstrap";
import {browserHistory} from "react-router";

const checkboxListItems = Object.keys(views).map(key=> {
    return {key, label: views[key].label};
});
const thresholdItems = Object.keys(thresholds).map(key=> {
    return {key, label: thresholds[key].label};
});

class CreatePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        const {challenge} = this.props;
        this.state = {
            challenge: {
                displayName: challenge.displayName,
                description: challenge.description,
                views: challenge.views,
                criteria_datetime: {
                    startDate: moment(challenge.criteria.datetime.after),
                    endDate: moment(challenge.criteria.datetime.before)
                },
                criteria_threshold: {
                    name: Object.keys(challenge.criteria.threshold)[0],
                    value: challenge.criteria.threshold[Object.keys(challenge.criteria.threshold)[0]]
                },
                private: true
            }
        };

        this.onBtnClick = this.onBtnClick.bind(this);
        this.handlerChangeFor = this.handlerChangeFor.bind(this);
    }

    onBtnClick(e) {
        e.preventDefault();
        const state = this.state.challenge;
        const challenge = {
            id: 'barada',
            displayName: state.displayName,
            description: state.description,
            views: state.views,
            criteria: {
                datetime: {
                    after: state.criteria_datetime.startDate.format(),
                    before: state.criteria_datetime.endDate.format()
                },
                threshold: {
                    [state.criteria_threshold.name]: state.criteria_threshold.value
                }
            },
            athletes: [],
            createdBy: this.props.user.id
        };
        this.props.challengeActions.createChallenge(challenge);
        browserHistory.push('/challenge/'+challenge.id);
    }

    handlerChangeFor(propName, getter = e=>e.target.value) {
        return (e)=> {
            const {challenge} = this.state;
            const newChallenge = Object.assign({}, challenge, {[propName]: getter(e)});
            this.setState({challenge: newChallenge});
        };
    }

    render() {
        const {user} = this.props;
        const {challenge} = this.state;

        return (
            <Box title="Create Challenge">
                <FormGroup>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl type="text" placeholder="Enter name" value={challenge.displayName}
                                 onChange={this.handlerChangeFor('displayName')}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Enter description" value={challenge.description}
                                 onChange={this.handlerChangeFor('description')}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Views</ControlLabel>
                    <br/>
                    <CheckboxList items={checkboxListItems} values={challenge.views}
                                  onChange={this.handlerChangeFor('views', e=>e)}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Criteria</ControlLabel>
                    <br/>
                    Date Time
                    <DateTimeRangeControl
                        startDate={challenge.criteria_datetime.startDate}
                        endDate={challenge.criteria_datetime.endDate}
                        onChange={this.handlerChangeFor('criteria_datetime', e=>{return e;})}/>
                    <br/>
                    Threshold (meters)
                    <SelectableTextControl placeholder="Enter threshold"
                                           items={thresholdItems}
                                           selectedItem={thresholdItems.find(item=>item.key === challenge.criteria_threshold.name)}
                                           textValue={challenge.criteria_threshold.value}
                                           onChange={this.handlerChangeFor('criteria_threshold', e=>{return {name:e.selectedItem.key, value:e.textValue};})}/>
                </FormGroup>
                <Checkbox checked={challenge.private} onChange={this.handlerChangeFor('private', e=>e.target.checked)}>Private
                    challenge (only visible to me)</Checkbox>
                <Button type="submit" onClick={this.onBtnClick}>Create</Button>
            </Box>);
    }
}

CreatePage.propTypes = {
    user: PropTypes.object,
    challenge: PropTypes.object,
    challengeActions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    const challengeID = ownProps.params.id;
    let challenge = {
        displayName: '',
        description: '',
        views: Object.keys(views),
        criteria: {
            datetime: {
                after: moment().add(-1, 'years').hour(0).minute(0).second(0).format(),
                before: moment().hour(23).minute(59).second(0).format()
            },
            threshold: {
                [thresholdItems[0].key]: 0
            }
        },
        private: true
    };
    if (challengeID) {
        challenge = state.challenges.find(t=>t.id === challengeID);
    }
    return {
        user: state.auth.user,
        challenge
    };
}

function mapDispatchToProps(dispatch) {
    return {
        challengeActions: bindActionCreators(challengeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);