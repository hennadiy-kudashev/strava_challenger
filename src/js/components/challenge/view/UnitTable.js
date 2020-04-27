import React from "react";
import UserInfo from "./UserInfo";
import Table, { SORT_DIRECTION } from "../../layout/table/Table";
import { Diff, MinActivities, Unit } from './format';
import BaseView from './BaseView';
import Tooltip from '../../layout/Tooltip';
import Sorter from "../../../logic/sorter";

class UnitTable extends BaseView {
  constructor(props, context, unitClass) {
    super(props, context);
    this.unitClass = unitClass;
    this.state = {
      sortBy: this.getThresholdCriterion(),
      sortDirection: SORT_DIRECTION.DESC,
      items: super.getSortedAthletes()
    };
    this.handleSort = this.handleSort.bind(this);
    this.unitSummary = new this.unitClass(
      this.getChallenge().criteria.datetime.after,
      this.getChallenge().criteria.datetime.before,
      this.getChallenge().criteria.threshold[this.getThresholdCriterion()],
      this.getChallenge().criteria.threshold.by,
      this.getChallenge().criteria.minActivities
    );
  }

  handleSort(sortBy, sortDirection) {
    let sorter;
    if (sortBy.startsWith('period_')) {
      const periodLabel = sortBy.replace('period_', '');
      const period = this.unitSummary.getPeriods().find(period => period.label === periodLabel);
      sorter = new Sorter(this.getThresholdCriterion(), sortDirection, period && period.start, period && period.end);
    } else {
      sorter = new Sorter(sortBy, sortDirection);
    }
    this.setState({
      sortBy,
      sortDirection,
      items: this.getChallenge().athletes.sort(sorter.getSortFn())
    });
  }

  render() {
    const { sortBy, sortDirection, items } = this.state;

    const columns = ['Athlete']
      .concat(this.unitSummary.getPeriodLabels().map(label =>
        ({ key: `period_${label}`, title: <span key={label} className="nowrap">{label}</span>, sortable: true })
      ))
      .concat([{ key: this.getThresholdCriterion(), title: 'Total', sortable: true }]);

    const rows = items.map((athlete, indexA) => {
      const total = this.unitSummary.getTotal(athlete.activities, this.getThresholdCriterion());
      return [
        <UserInfo key={indexA} userInfo={athlete.info}/>,
        ...this.unitSummary.getPeriodDiff(athlete.activities, this.getThresholdCriterion())
          .map((obj, index) => <span key={index}>
            <Diff total={obj.monthTotal} diff={obj.monthDiff} criterion={this.getThresholdCriterion()}/>
            <MinActivities value={obj.activitiesCount} min={obj.minActivities}/>
          </span>),
        <Diff key={indexA} total={total.total} diff={total.diff} criterion={this.getThresholdCriterion()}/>
      ];
    });
    rows.unshift([
      <span key="tooltip">Norm<Tooltip>
                <div>Norm for a past month - norm of a day * number of days in month.</div>
                <div>Norm for the current month - norm of a day * past days in the month by now.</div>
                <div>Colored values display the difference between norm and actual data.</div>
            </Tooltip></span>,
      ...this.unitSummary.getPeriodsNorm().map((obj, index) => <Unit key={index} unit={obj}
                                                                     criterion={this.getThresholdCriterion()}/>),
      <Unit key="norm" unit={this.unitSummary.getNormByNow()} criterion={this.getThresholdCriterion()}/>
    ]);

    return (<Table
      columns={columns}
      rows={rows}
      sortBy={sortBy}
      sortDirection={sortDirection}
      onSort={this.handleSort}
    />);
  }
}

export default UnitTable;
