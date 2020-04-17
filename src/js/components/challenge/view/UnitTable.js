import React from "react";
import UserInfo from "./UserInfo";
import Table from "../../layout/table/Table";
import { Diff, Unit } from './format';
import BaseView from './BaseView';
import Tooltip from '../../layout/Tooltip';
import BY from "./thresholdBy";

class UnitTable extends BaseView {
  constructor(props, context, unitClass) {
    super(props, context);
    this.unitClass = unitClass;
  }

  render() {
    const unitSummary = new this.unitClass(
      this.getChallenge().criteria.datetime.after,
      this.getChallenge().criteria.datetime.before,
      this.getChallenge().criteria.threshold[this.getThresholdCriterion()],
      this.getChallenge().criteria.threshold.by || BY.TOTAL
    );

    const columns = ['Athlete'].concat(unitSummary.getPeriodLabels()).concat(['Total']);

    const rows = super.getSortedAthletes().map((athlete, indexA) => {
      const total = unitSummary.getTotal(athlete.activities, this.getThresholdCriterion());
      return [
        <UserInfo key={indexA} userInfo={athlete.info}/>,
        ...unitSummary.getPeriodDiff(athlete.activities, this.getThresholdCriterion())
          .map((obj, index) => <Diff key={index} total={obj.monthTotal} diff={obj.monthDiff}
                                     criterion={this.getThresholdCriterion()}/>),
        <Diff key={indexA} total={total.total} diff={total.diff} criterion={this.getThresholdCriterion()}/>
      ];
    });
    rows.unshift([
      <span key="tooltip">Norm<Tooltip>
                <div>Norm for a past month - norm of a day * number of days in month.</div>
                <div>Norm for the current month - norm of a day * past days in the month by now.</div>
                <div>Colored values display the difference between norm and actual data.</div>
            </Tooltip></span>,
      ...unitSummary.getPeriodsNorm().map((obj, index) => <Unit key={index} unit={obj}
                                                                criterion={this.getThresholdCriterion()}/>),
      <Unit key="norm" unit={unitSummary.getNormByNow()} criterion={this.getThresholdCriterion()}/>
    ]);

    return (<Table columns={columns} rows={rows}/>);
  }
}

export default UnitTable;
