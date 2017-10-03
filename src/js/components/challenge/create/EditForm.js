import React, {PropTypes} from 'react';
import {FormGroup, FormControl, ControlLabel, Checkbox, Button} from "react-bootstrap";
import DateTimeRangeControl from "../../shared/DateTimeRangeControl";
import SelectableTextControl from "../../shared/SelectableTextControl";
import CheckboxList from "../../shared/CheckboxList";
import Box from "../../layout/Box";
import views from "../view/views";
import thresholds from "../view/thresholds";
import EditStateConverter from './EditStateConverter';

const checkboxListItems = Object.keys(views).map(key=> {
    return {key, label: views[key].label};
});
const thresholdItems = Object.keys(thresholds).map(key=> {
    return {key, label: thresholds[key].label};
});
const handlerChangeFor = (state, onChange, propName, getter = e=>e.target.value) => {
    return (e)=> {
        const challenge = Object.assign({}, state, {[propName]: getter(e)});
        onChange(EditStateConverter.toApi(challenge));
    };
};

const EditForm = ({operation, challenge, onChange, onSave}) => {
    
    const state = EditStateConverter.fromAPI(challenge);
    
    return (
        <Box title={`${operation} Challenge`}>
            <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl type="text" placeholder="Enter name" value={state.displayName}
                             onChange={handlerChangeFor(state, onChange, 'displayName')}/>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Enter description" value={state.description}
                             onChange={handlerChangeFor(state, onChange, 'description')}/>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Views</ControlLabel>
                <br/>
                <CheckboxList items={checkboxListItems} values={state.views}
                              onChange={handlerChangeFor(state, onChange, 'views', e=>e)}/>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Criteria</ControlLabel>
                <br/>
                Date Time
                <DateTimeRangeControl
                    startDate={state.criteria_datetime.startDate}
                    endDate={state.criteria_datetime.endDate}
                    onChange={handlerChangeFor(state, onChange, 'criteria_datetime', e=>{return e;})}/>
                <br/>
                Threshold (meters)
                <SelectableTextControl placeholder="Enter threshold"
                                       items={thresholdItems}
                                       selectedItem={thresholdItems.find(item=>item.key === state.criteria_threshold.name)}
                                       textValue={state.criteria_threshold.value}
                                       onChange={handlerChangeFor(state, onChange, 'criteria_threshold', e=>{return {name:e.selectedItem.key, value:e.textValue};})}/>
            </FormGroup>
            <Checkbox checked={state.private} onChange={handlerChangeFor(state, onChange, 'private', e=>e.target.checked)}>Private
                challenge (only visible to me)</Checkbox>
            <Button type="submit" onClick={onSave}>{operation}</Button>
        </Box>
    );
};

EditForm.propTypes = {
    operation: PropTypes.string.isRequired,
    challenge: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    onSave: PropTypes.func
};

export default EditForm;