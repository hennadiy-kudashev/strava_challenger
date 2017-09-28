import React, {PropTypes} from "react";
import {InputGroup, FormControl, DropdownButton, MenuItem} from "react-bootstrap";

const onMenuItemSelected = (textValue, onChange)=> {
    return (item) => {
        onChange({
            selectedItem: item, 
            textValue: textValue
        });
    };
};

const onTextChanged = (selectedItem, onChange)=> {
    return (e) => {
        onChange({
            selectedItem: selectedItem,
            textValue: parseInt(e.target.value)
        });
    };
};

const SelectableTextControl = ({items, placeholder, selectedItem, textValue, onChange}) => {
    return (
        <InputGroup>
            <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title={selectedItem.label}>
                {
                    items.map(item=> {
                        return (<MenuItem key={item.key} eventKey={item}
                                          onSelect={onMenuItemSelected(textValue, onChange)}>{item.label}</MenuItem>);
                    })
                }
            </DropdownButton>
            <FormControl type="text" placeholder={placeholder} value={textValue} onChange={onTextChanged(selectedItem, onChange)}/>
        </InputGroup>
    );
};

SelectableTextControl.propTypes = {
    items: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    selectedItem: PropTypes.object,
    textValue: PropTypes.number,
    onChange: PropTypes.func
};

export default SelectableTextControl;