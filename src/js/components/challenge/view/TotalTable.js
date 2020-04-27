import React from "react";
import UserInfo from "./UserInfo";
import Table, { SORT_DIRECTION } from "../../layout/table/Table";
import TotalSummary from "../../../logic/totalSummary";
import { Kilometre, Metre, Time, Unit } from "./format";
import BaseView from "./BaseView";
import { THRESHOLD_CRITERION } from "./thresholds";
import Sorter from "../../../logic/sorter";

class TotalTable extends BaseView {
  constructor(props, context) {
    super(props, context);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      sortBy: this.getThresholdCriterion(),
      sortDirection: SORT_DIRECTION.DESC,
      items: super.getSortedAthletes()
    };
  }

  handleSort(sortBy, sortDirection) {
    const sorter = new Sorter(sortBy, sortDirection);
    this.setState({
      sortBy,
      sortDirection,
      items: this.getChallenge().athletes.sort(sorter.getSortFn())
    });
  }

  render() {
    const { sortBy, sortDirection, items } = this.state;
    const threshold = this.getThreshold();
    const columns = ['Athlete',
      { key: 'count', title: 'Activities', sortable: true },
      { key: THRESHOLD_CRITERION.DISTANCE, title: 'Distance', sortable: true },
      { key: THRESHOLD_CRITERION.EVAL_GAIN, title: 'Elev Gain', sortable: true },
      { key: THRESHOLD_CRITERION.TIME, title: 'Time', sortable: true },
      { key: this.getThresholdCriterion(), title: `Diff (${threshold.label})`, sortable: true },
    ];

    const criterion = this.getThresholdCriterion();
    const rows = items.map((athlete, index) => {
      const totalSummary = new TotalSummary(athlete.activities);
      return [
        <UserInfo key={index} userInfo={athlete.info}/>,
        totalSummary.getRunCount(),
        <Kilometre key={index} unit={totalSummary.getDistance()}/>,
        <Metre key={index} unit={totalSummary.getElevGain()}/>,
        <Time key={index} unit={totalSummary.getTime()}/>,
        <Unit key={index} unit={totalSummary.getByCriterion(criterion) - this.getThresholdValue()}
              criterion={criterion} colored/>
      ];
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

export default TotalTable;
