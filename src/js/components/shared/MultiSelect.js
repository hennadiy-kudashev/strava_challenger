import React, {PropTypes} from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const MultiSelect = ({options, values, onChange})=>{
    return (<Select
      options={options}
      value={values}
      onChange={onChange}
      multi
      isSearchable
    />);
};

MultiSelect.propTypes = {
    options: PropTypes.array.isRequired, //{value,label}
    values: PropTypes.array.isRequired, // array os keys which are checked [key1, key3]
    onChange: PropTypes.func
};

export default MultiSelect;
