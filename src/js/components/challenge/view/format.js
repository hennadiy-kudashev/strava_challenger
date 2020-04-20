/*eslint-disable react/no-multi-comp*/
/*eslint-disable react/prop-types*/
import React from "react";
import thresholds from "./thresholds";

function Base({ unit, children, colored }) {
  const positive = unit > 0;
  const sign = colored ? (positive ? '+' : '-') : '';
  const additionalClass = colored ? (positive ? 'text-green' : 'text-red') : '';
  return (<span className={`nowrap ${additionalClass}`}>{sign}{children}</span>);
}

export function Kilometre({ unit: metres, colored }) {
  return (<Base unit={metres} colored={colored}>{Math.abs(Math.round(metres / 1000))} km</Base>);
}

export function Metre({ unit: metres, colored }) {
  return (<Base unit={metres} colored={colored}>{Math.abs(Math.round(metres))} m</Base>);
}

export function Time({ unit: seconds, colored }) {
  const hr = Math.floor(seconds / 3600);
  const min = Math.round((seconds - (hr * 3600)) / 60);
  return (<Base unit={seconds} colored={colored}>{Math.abs(hr)}h {min}m</Base>);
}

export function Diff({ total, diff, criterion }) {
  if (total == 0) {
    return (<span/>);
  }
  const Component = thresholds[criterion].component;
  return (<div>
    <Component unit={total}/>
    <br/>
    <Component unit={diff} colored/>
  </div>);
}

export function Unit({ unit, criterion, ...props }) {
  if (unit == 0) {
    return (<span/>);
  }
  const Component = thresholds[criterion].component;
  return (<Component unit={unit} {...props} />);
}

export function MinActivities({ value, min }) {
  if (min === 0) {
    return (<span/>);
  }
  const additionalClass = value >= min ? 'text-green' : 'text-red';
  return (<div>
    <span className={additionalClass}>{value}</span>
    {' '}of{' '}
    <span>{min} activities</span>
  </div>);
}
