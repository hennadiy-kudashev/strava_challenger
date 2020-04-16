import React, {PropTypes} from "react";
import UserInfo from "./UserInfo";
import Table from "../../layout/table/Table";
import TotalSummary from "../../../logic/totalSummary";
import {Kilometre, Metre, Time, Unit} from "./format";
import BaseView from "./BaseView";

class TotalTable extends BaseView {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const threshold = this.getThreshold();
        const columns = ['Athlete', 'Activities', 'Distance', 'Elev Gain', 'Time', `Diff (${threshold.label})`];

        const criterion = this.getThresholdCriterion();
        const rows = super.getSortedAthletes().map((athlete, index)=> {
            const totalSummary = new TotalSummary(athlete.activities);
            return [
                <UserInfo key={index} userInfo={athlete.info}/>,
                totalSummary.getRunCount(),
                <Kilometre key={index} unit={totalSummary.getDistance()}/>,
                <Metre key={index} unit={totalSummary.getElevGain()}/>,
                <Time key={index} unit={totalSummary.getTime()}/>,
                <Unit key={index} unit={totalSummary.getByCriterion(criterion)-this.getThresholdValue()}
                      criterion={criterion} colored/>
            ];
        });
        return (
            <Table columns={columns} rows={rows}/>
        );
    }
}

export default TotalTable;
