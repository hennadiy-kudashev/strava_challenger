import React from "react";
import UserInfo from "./UserInfo";
import Table from "../../layout/table/Table";
import TotalSummary from "../../../logic/totalSummary";
import { Kilometre, Metre, Time } from "./format";
import BaseView from "./BaseView";
import Sorter from "../../../logic/sorter";
import groupByActivityType from "./activityTypes";

class ActivityTypesTable extends BaseView {
  constructor(props, context) {
    super(props, context);
    this.sorter = new Sorter(this.getThresholdCriterion());
  }

  render() {
    const columns = ['Athlete', 'Activities', 'Distance', 'Elev Gain', 'Time'];

    const grouped = groupByActivityType(super.getChallenge().athletes);
    const rows = [];
    Object.keys(grouped).forEach(type => {
      rows.push([type]);
      grouped[type].sort(this.sorter.getSortFn()).forEach(({ athlete, activities }) => {
        const totalSummary = new TotalSummary(activities);
        return rows.push([
          <UserInfo key="userInfo" userInfo={athlete.info}/>,
          totalSummary.getRunCount(),
          <Kilometre key="km" unit={totalSummary.getDistance()}/>,
          <Metre key="m" unit={totalSummary.getElevGain()}/>,
          <Time key="time" unit={totalSummary.getTime()}/>
        ]);
      });
    });
    return (
      <Table columns={columns} rows={rows}/>
    );
  }
}

export default ActivityTypesTable;
