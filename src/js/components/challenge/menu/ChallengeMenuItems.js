import React, {PropTypes} from "react";
import ChallengeMenuItem from "./ChallengeMenuItem";
import Collapse from "react-bootstrap/lib/Collapse";

class ChallengeMenuItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: !props.openedInitially
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        const {title, challenges, pathname} = this.props;
        const {collapsed} = this.state;

        const isActive = (id)=> {
            return pathname.split('/').includes(id);
        };
        if (challenges.length == 0) {
            return null;
        }

        return (
            <ul className="sidebar-menu">
                <li className={"treeview" + (collapsed? "": " active")}>
                    <a href="#" onClick={this.handleToggle}><span>{title}</span>
                        <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"/>
                        </span>
                    </a>
                    <Collapse in={!collapsed}>
                        <ul className="treeview-menu">
                            {
                                challenges.map(challenge => <ChallengeMenuItem
                                    key={challenge._id}
                                    active={isActive(challenge._id)}
                                    challenge={challenge}
                                />)
                            }
                        </ul>
                    </Collapse>
                </li>
            </ul>);
    }
}

ChallengeMenuItems.propTypes = {
    title: PropTypes.string.isRequired,
    challenges: PropTypes.array.isRequired,
    pathname: PropTypes.string.isRequired,
    openedInitially: PropTypes.bool
};

ChallengeMenuItems.defaultProps = {
    openedInitially: false
};

export default ChallengeMenuItems;
