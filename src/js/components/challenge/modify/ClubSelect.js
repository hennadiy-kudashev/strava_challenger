import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl } from "react-bootstrap";
import { getAthleteClubs } from "../../../actions/clubActions";

class ClubSelect extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getAthleteClubs, clubs } = this.props;
    if (!clubs) {
      getAthleteClubs();
    }
  }

  handleChange(e) {
    const { onChange, clubs } = this.props;
    const id = e.target.value;
    if (id) {
      onChange(clubs.find(club => club.id === id));
    } else {
      onChange(null);
    }
  }

  render() {
    const { value, clubs } = this.props;
    if (!clubs) {
      return (<div>loading...</div>);
    }
    return (
      <FormControl
        componentClass="select"
        value={value && value.id}
        onChange={this.handleChange}
      >
        <option value=""> --- select club ---</option>
        {clubs.map(item => (<option key={item.id} value={item.id}>{item.name}</option>))}
      </FormControl>
    );
  }
}

ClubSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  getAthleteClubs: PropTypes.func.isRequired,
  clubs: PropTypes.array,
};

const mapStateToProps = ({ clubs }) => ({ clubs });

export default connect(mapStateToProps, { getAthleteClubs })(ClubSelect);
