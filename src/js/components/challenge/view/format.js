/*eslint-disable react/no-multi-comp*/
/*eslint-disable react/prop-types*/
import React from "react";
import thresholds from "./thresholds";

export function Kilometre({metres, colored}) {
    const positive = metres > 0;
    const sign = colored ? (positive ? '+' : '-') : '';
    const additionalClass = colored ? (positive ? 'text-green' : 'text-red') : '';
    return (<span className={`nowrap ${additionalClass}`}>{sign}{Math.abs(Math.round(metres / 1000))} km</span>);
}

export function Metre({metres, colored}) {
    const positive = metres > 0;
    const sign = colored ? (positive ? '+' : '-') : '';
    const additionalClass = colored ? (positive ? 'text-green' : 'text-red') : '';
    return (<span className={`nowrap ${additionalClass}`}>{sign}{Math.abs(Math.round(metres))} m</span>);
}

export function Time({seconds}) {
    const hr = Math.floor(seconds / 3600);
    const min = Math.floor((seconds - (hr * 3600)) / 60);
    return (<span className="nowrap">{hr}h {min}m</span>);
}

export function Diff({total, diff, criterion}) {
    if (total == 0) {
        return (<span />);
    }
    const Component = thresholds[criterion].component;
    return (<div>
        <Component metres={total}/>
        <br />
        <Component metres={diff} colored/>
    </div>);
}