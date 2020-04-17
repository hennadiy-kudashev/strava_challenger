import React, { PropTypes } from "react";
import { DropdownButton, FormControl, InputGroup, MenuItem } from "react-bootstrap";

const onLeftMenuItemSelected = (textValue, rightSelectedItem, onChange) => {
  return (item) => {
    onChange({
      leftSelectedItem: item,
      rightSelectedItem: rightSelectedItem,
      textValue: textValue
    });
  };
};

const onRightMenuItemSelected = (textValue, leftSelectedItem, onChange) => {
  return (item) => {
    onChange({
      leftSelectedItem: leftSelectedItem,
      rightSelectedItem: item,
      textValue: textValue
    });
  };
};

const onTextChanged = (leftSelectedItem, rightSelectedItem, onChange) => {
  return (e) => {
    onChange({
      leftSelectedItem: leftSelectedItem,
      rightSelectedItem: rightSelectedItem,
      textValue: parseInt(e.target.value)
    });
  };
};

const SelectableTextControl = ({ leftItems, rightItems, placeholder, leftSelectedItem, rightSelectedItem, textValue, onChange }) => {
  return (
    <InputGroup>
      {leftItems &&
      <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title={leftSelectedItem.label}>
        {
          leftItems.map(item => {
            return (<MenuItem key={item.key} eventKey={item}
                              onSelect={onLeftMenuItemSelected(textValue, rightSelectedItem, onChange)}>{item.label}</MenuItem>);
          })
        }
      </DropdownButton>}
      <FormControl type="number" placeholder={placeholder} value={textValue}
                   onChange={onTextChanged(leftSelectedItem, rightSelectedItem, onChange)}/>
      {rightItems &&
      <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon1" title={rightSelectedItem.label}>
        {
          rightItems.map(item => {
            return (<MenuItem key={item.key} eventKey={item}
                              onSelect={onRightMenuItemSelected(textValue, leftSelectedItem, onChange)}>{item.label}</MenuItem>);
          })
        }
      </DropdownButton>}
    </InputGroup>
  );
};

SelectableTextControl.propTypes = {
  leftItems: PropTypes.array,
  rightItems: PropTypes.array,
  placeholder: PropTypes.string,
  leftSelectedItem: PropTypes.object,
  rightSelectedItem: PropTypes.object,
  textValue: PropTypes.number,
  onChange: PropTypes.func
};

export default SelectableTextControl;
