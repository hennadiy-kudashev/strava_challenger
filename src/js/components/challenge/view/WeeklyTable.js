import React from "react";
import WeeklySummary from '../../../logic/WeeklySummary';
import UnitTable from './UnitTable';

class WeeklyTable extends UnitTable {
  constructor(props, context) {
    super(props, context, WeeklySummary);
  }
}

export default WeeklyTable;
