import React from 'react';

const Intro = () => {
    return (
        <div className="box-body">
            <dl>
                <dt>Hello!</dt>
                <dd>Welcome to Strava Challenger project!</dd>
                <dt>Goal</dt>
                <dd>The main goal of this project is to create custom challenges and monitor progress to motivate yourself.
                    In the first version you are not able to create a challenge by yourself, you can only join challenges which have been created by admin.
                    Soon you are able to do it! Keep in touch!</dd>
                <dt>How it works</dt>
                <dd>Each challenge has criteria (e.g start/end date) by which we get the data from Strava.
                    This project doesn't store any Strava activities.
                    So when you add new activity to Strava it will reflect challenge result on this site.</dd>
                <dt>Collaboration</dt>
                <dd>The project is open source, so feel free to <a href="https://github.com/hennadiy-kudashev/strava_challenger">contribute</a>.
                    Ideas, feedback and improvements please send to <a href="mailto:genaDOTutyfATgmailDOTcom" onClick="this.href=this.href.replace(/AT/,'&#64;').replace(/DOT/,'&#46;')">email</a>.</dd>
            </dl>
        </div>
    );
};

export default Intro;