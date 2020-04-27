import React, {PropTypes} from "react";
import Checkbox from "react-bootstrap/lib/Checkbox";

const onChangeWith = (values, key, onChange) =>{
    return (e)=> {
        if (e.target.checked){
            values.push(key);
        } else {
            values = values.filter(value=>value!==key);
        }
        onChange(values);
    };
};

const CheckboxList = ({items, values, onChange})=>{
    return (<div>
        {
            items.map(item=> {
                const checked = values.includes(item.key);
                return (<Checkbox key={item.key} inline checked={checked}
                                  onChange={onChangeWith(values, item.key, onChange)}>{item.label}</Checkbox>);
            })
        }
    </div>);
};

CheckboxList.propTypes = {
    items: PropTypes.array.isRequired, //{key,label}
    values: PropTypes.array.isRequired, // array os keys which are checked [key1, key3]
    onChange: PropTypes.func
};

export default CheckboxList;
