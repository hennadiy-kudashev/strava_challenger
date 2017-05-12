import React, {PropTypes} from "react";

const Box = ({title, children}) => {
    return (
        <div className="content">
            <div className="box box-default">
                <div className="box-header with-border">
                    <h3 className="box-title">{title}</h3>
                </div>
                <div className="box-body">
                    {children}
                </div>
                <div className="box-footer">
                </div>
            </div>
        </div>
    );
};

Box.propTypes = {
    title: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
};

export default Box;
