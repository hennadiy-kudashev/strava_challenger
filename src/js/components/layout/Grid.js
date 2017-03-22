import React, { PropTypes } from 'react';

const Grid = ({title, children}) => {
    return (
        <div className="content">
            <div className="box box-default">
                <div className="box-header">
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

Grid.propTypes = {
    title: PropTypes.string,
    children: PropTypes.array
};

export default Grid;
