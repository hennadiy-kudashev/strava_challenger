import React, { PropTypes } from 'react';
import { Button, Checkbox, ControlLabel, FormControl, FormGroup } from "react-bootstrap";
import DateTimeRangeControl from "../../shared/DateTimeRangeControl";
import SelectableTextControl from "../../shared/SelectableTextControl";
import CheckboxList from "../../shared/CheckboxList";
import MultiSelect from "../../shared/MultiSelect";
import Box from "../../layout/Box";
import views from "../view/views";
import thresholds from "../view/thresholds";
import activityTypes from "../../../api/activityTypes";
import EditStateConverter from './EditStateConverter';

const checkboxListItems = Object.keys(views).map(key => {
  return { key, label: views[key].label };
});
const thresholdItems = Object.keys(thresholds).map(key => {
  return { key, label: `${thresholds[key].label} (${thresholds[key].unit})` };
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
        Threshold
        <SelectableTextControl placeholder="Enter threshold"
                               items={thresholdItems}
                               selectedItem={thresholdItems.find(item => item.key === state.criteria_threshold.name)}
                               textValue={thresholds[state.criteria_threshold.name].toDisplayUnit(state.criteria_threshold.value)}
                               onChange={handlerChangeFor(state, onChange, 'criteria_threshold', e => {
                                 const threshold = thresholds[e.selectedItem.key];
                                 return { name: e.selectedItem.key, value: threshold.toActivityUnit(e.textValue) };
                               })}/>
      </FormGroup>
      <Checkbox checked={state.private} onChange={handlerChangeFor(state, onChange, 'private', e => e.target.checked)}>Private
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
