import React, {PropTypes} from 'react';
import NavTab from './NavTab';

class Tabs extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {selected: 0};
        this.selectTab = this.selectTab.bind(this);
        this.renderLabels = this.renderLabels.bind(this);
    }

    selectTab(index) {
        this.setState({selected: index});
    }

    renderLabels() {
        const {labels} = this.props;

        return labels.map((label, index) => {
            return (
                <NavTab key={index}
                    index={index}
                    label={label}
                    selected={this.state.selected}
                    onSelectTab={this.selectTab}
                />
            );
        });
    }

    render() {
        return (
            <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                    {this.renderLabels()}
                </ul>
                <div className="tab-content">
                    {this.props.children[this.state.selected]}
                </div>
            </div>
        );
    }

}

Tabs.propTypes = {
    labels: PropTypes.array,
    children: PropTypes.array
};

export default Tabs;

