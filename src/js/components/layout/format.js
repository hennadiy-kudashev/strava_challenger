import React from "react";

export function Kilometre({metres}) {
    return (<span className="nowrap">{Math.round(metres / 1000)} km</span>);
}

export function Metre({metres}) {
    return (<span className="nowrap">{Math.round(metres)} m</span>);
}

export function Time({seconds}) {
    const hr = Math.floor(seconds / 3600);
    const min = Math.floor((seconds - (hr * 3600)) / 60);
    return (<span className="nowrap">{hr}h {min}m</span>);
}

export function KilometreColor({metres}) {
    if (metres > 0) {
        return (<span className="nowrap text-green">+{Math.round(metres / 1000)} km</span>);
    } else {
        return (<span className="nowrap text-red">{Math.round(metres / 1000)} km</span>);
    }

}

export function DistanceAndDiff({distance, diff}) {
    if (distance == 0) {
        return (<span />);
    }
    return (<div>
        <Kilometre metres={distance}/>
        <br />
        <KilometreColor metres={diff}/>
    </div>);
}