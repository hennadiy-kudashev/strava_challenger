import React, {PropTypes} from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import '../../../resources/styles/daterangepicker.css';
import moment from 'moment';

const onDatePickerEvent = (onChange) => {
    return (event, picker)=> {
        onChange({
            startDate: picker.startDate,
            endDate: picker.endDate
        });
    };
};

const DateTimeRangeControl = ({startDate = moment(), endDate = moment(), onChange}) => {
    const format = 'DD/MM/YYYY HH:ss';
    const label = `${startDate.format(format)} - ${endDate.format(format)}`;
    return (
        <div className="input-group">
            <div className="input-group-addon">
                <i className="fa fa-clock-o" />
            </div>
            <DateRangePicker startDate={startDate} endDate={endDate} timePicker timePickerIncrement={1} onEvent={onDatePickerEvent(onChange)} >
                <input type="text" className="form-control pull-right" readOnly placeholder="Enter date and time range" value={label} />
            </DateRangePicker>
        </div>
    );
};

DateTimeRangeControl.propTypes = {
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    onChange: PropTypes.func
};

export default DateTimeRangeControl;