import React from "react";
import UserInfo from "./UserInfo";
import Table from "../../layout/table/Table";
import TotalSummary from "../../../logic/totalSummary";
import { Kilometre, Metre, Time } from "./format";
import BaseView from "./BaseView";
import Sorter from "../../../logic/sorter";

const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
);

class ActivityTypesTable extends BaseView {
  constructor(props, context) {
    super(props, context);
    this.sorter = new Sorter(this.getThresholdCriterion());
  }

  render() {
    const columns = ['Athlete', 'Activities', 'Distance', 'Elev Gain', 'Time'];

    const map = {};
    super.getChallenge().athletes.forEach((athlete) => {
      const grouped = groupBy(athlete.activities, 'type');
      Object.keys(grouped).forEach(type => {
        const activities = map[type];
        if (!activities) {
          map[type] = [];
        }
        map[type].push({
          athlete,
          activities: grouped[type],
        });
      });
    });
    const rows = [];
    Object.keys(map).forEach(type => {
      rows.push([type]);
      map[type].sort(this.sorter.getSortFn()).forEach(({ athlete, activities }) => {
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
