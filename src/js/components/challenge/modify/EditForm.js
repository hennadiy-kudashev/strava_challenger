import React, { PropTypes } from 'react';
import { Button, Checkbox, ControlLabel, FormControl, FormGroup } from "react-bootstrap";
import DateTimeRangeControl from "../../shared/DateTimeRangeControl";
import SelectableTextControl from "../../shared/SelectableTextControl";
import CheckboxList from "../../shared/CheckboxList";
import MultiSelect from "../../shared/MultiSelect";
import Box from "../../layout/Box";
import views from "../view/views";
import thresholds from "../view/thresholds";
import thresholdBYs from "../view/thresholdBYs";
import activityTypes from "../../../api/activityTypes";
import EditStateConverter from './EditStateConverter';
import ClubSelect from "./ClubSelect";

const checkboxListItems = Object.keys(views).map(key => {
  return { key, label: views[key].label };
});
const thresholdItems = Object.keys(thresholds).map(key => {
  return { key, label: `${thresholds[key].label} (${thresholds[key].unit})` };
});
const thresholdByItems = Object.keys(thresholdBYs).map(key => {
  return { key, label: thresholdBYs[key].label };
});
const activityTypeItems = activityTypes.map(type => {
  return { value: type, label: type };
});
const handlerChangeFor = (state, onChange, propName, getter = e => e.target.value) => {
  return (e) => {
    const challenge = Object.assign({}, state, { [propName]: getter(e) });
    onChange(EditStateConverter.toApi(challenge));
  };
};

const EditForm = ({ operation, challenge, onChange, onSave }) => {
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
                      onChange={handlerChangeFor(state, onChange, 'views', e => e)}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Criteria</ControlLabel>
        <br/>
        Activity Types (select if you want to restrict)
        <MultiSelect
          values={state.criteria_types}
          options={activityTypeItems}
          onChange={handlerChangeFor(state, onChange, 'criteria_types', e => e.map(type => type.value))}
        />
        <br/>
        Date Time
        <DateTimeRangeControl
          startDate={state.criteria_datetime.startDate}
          endDate={state.criteria_datetime.endDate}
          onChange={handlerChangeFor(state, onChange, 'criteria_datetime', e => e)}/>
        <br/>
        Each participant should accomplish minimum
        <SelectableTextControl placeholder="Enter threshold"
                               leftItems={thresholdItems}
                               leftSelectedItem={thresholdItems.find(item => item.key === state.criteria_threshold.name)}
                               rightItems={thresholdByItems}
                               rightSelectedItem={thresholdByItems.find(item => item.key === state.criteria_threshold.by)}
                               textValue={thresholds[state.criteria_threshold.name].toDisplayUnit(state.criteria_threshold.value)}
                               onChange={handlerChangeFor(state, onChange, 'criteria_threshold', e => {
                                 const threshold = thresholds[e.leftSelectedItem.key];
                                 return {
                                   name: e.leftSelectedItem.key,
                                   by: e.rightSelectedItem.key,
                                   value: threshold.toActivityUnit(e.textValue)
                                 };
                               })}/>
        <br/>
        Each participant should accomplish minimum activities
        <SelectableTextControl placeholder="Enter min activities"
                               rightItems={thresholdByItems}
                               rightSelectedItem={thresholdByItems.find(item => item.key === state.criteria_min_activities.by)}
                               textValue={state.criteria_min_activities.value}
                               onChange={handlerChangeFor(state, onChange, 'criteria_min_activities', e => {
                                 return {
                                   by: e.rightSelectedItem.key,
                                   value: e.textValue
                                 };
                               })}/>
        <br/>
        Each activity should have minimum
        <SelectableTextControl placeholder="Enter min threshold"
                               leftItems={thresholdItems}
                               leftSelectedItem={thresholdItems.find(item => item.key === state.criteria_activity_length.name)}
                               textValue={thresholds[state.criteria_activity_length.name].toDisplayUnit(state.criteria_activity_length.value)}
                               onChange={handlerChangeFor(state, onChange, 'criteria_activity_length', e => {
                                 const threshold = thresholds[e.leftSelectedItem.key];
                                 return {
                                   name: e.leftSelectedItem.key,
                                   value: threshold.toActivityUnit(e.textValue)
                                 };
                               })}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Visibility</ControlLabel>
        <br/>
        Only visible to club members
        <ClubSelect
          value={state.club}
          onChange={handlerChangeFor(state, onChange, 'club', e => e)}
        />
        <Checkbox
          checked={state.private}

          onChange={handlerChangeFor(state, onChange, 'private', e => e.target.checked)}
        >Private challenge (only visible to me)</Checkbox>
      </FormGroup>
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
