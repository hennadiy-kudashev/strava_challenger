import React, {PropTypes} from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import "../../../resources/styles/daterangepicker.css";

const onDatePickerEvent = (onChange) => {
    return (event, picker)=> {
        onChange({
            startDate: picker.startDate,
            endDate: picker.endDate
        });
    };
};

const ranges = {
    'Today': [moment().startOf('day'), moment().endOf('day')],
    'This Month': [moment().startOf('month').startOf('day'), moment().endOf('month').endOf('day')],
    'This Year': [moment().startOf('year').startOf('day'), moment().endOf('year').endOf('day')],
    'Next Month': [moment().add(1, 'month').startOf('month').startOf('day'), moment().add(1, 'month').endOf('month').endOf('day')],
    'Next Year': [moment().add(1, 'year').startOf('year').startOf('day'), moment().add(1, 'year').endOf('year').endOf('day')]
};

const DateTimeRangeControl = ({startDate = moment(), endDate = moment(), onChange}) => {
    const format = 'DD/MM/YYYY HH:mm';
    const label = `${startDate.format(format)} - ${endDate.format(format)}`;
    return (
        <div className="input-group">
            <div className="input-group-addon">
                <i className="fa fa-clock-o"/>
            </div>
            <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                timePicker
                timePicker24Hour
                timePickerIncrement={1}
                onEvent={onDatePickerEvent(onChange)}
                ranges={ranges}
                locale={{format:format}}>
                <input type="text" className="form-control pull-right" readOnly placeholder="Enter date and time range"
                       value={label}/>
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