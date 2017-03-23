import React, {PropTypes} from 'react';
import classnames from 'classnames';

class NavTab extends React.Component  {
    constructor(props, context) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        const {index, onSelectTab} = this.props;
        onSelectTab(index);
    }

    render() {
        const {index, selected, label, onSelectTab} = this.props;

        return (
            <li className={classnames({'active': index === selected})} >
                <a href="#" onClick={this.onClick}>{label}</a>
            </li>
        );
    }
}

NavTab.propTypes = {
    index: PropTypes.number.isRequired,
    selected: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    onSelectTab: PropTypes.func.isRequired
};

export default NavTab;
