import React from "react";
import UserInfo from "./UserInfo";
import Table, { SORT_DIRECTION } from "../../layout/table/Table";
import TotalSummary from "../../../logic/totalSummary";
import { Kilometre, Metre, Time } from "./format";
import BaseView from "./BaseView";
import Sorter from "../../../logic/sorter";
import groupByActivityType from "./activityTypes";
import { THRESHOLD_CRITERION } from "./thresholds";

class ActivityTypesTable extends BaseView {
  constructor(props, context) {
    super(props, context);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      sortBy: this.getThresholdCriterion(),
      sortDirection: SORT_DIRECTION.DESC,
    };
  }

  handleSort(sortBy, sortDirection) {
    this.setState({
      sortBy,
      sortDirection,
    });
  }

  render() {
    const { sortBy, sortDirection } = this.state;

    const columns = ['Athlete',
      { key: 'count', title: 'Activities', sortable: true },
      { key: THRESHOLD_CRITERION.DISTANCE, title: 'Distance', sortable: true },
      { key: THRESHOLD_CRITERION.EVAL_GAIN, title: 'Elev Gain', sortable: true },
      { key: THRESHOLD_CRITERION.TIME, title: 'Time', sortable: true },
    ];

    const grouped = groupByActivityType(super.getChallenge().athletes);
    const rows = [];
    Object.keys(grouped).forEach(type => {
      rows.push([type]);
      const sorter = new Sorter(sortBy, sortDirection);
      grouped[type].sort(sorter.getSortFn()).forEach(({ athlete, activities }) => {
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
      <Table
        columns={columns}
        rows={rows}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={this.handleSort}
      />
    );
  }
}

export default ActivityTypesTable;
