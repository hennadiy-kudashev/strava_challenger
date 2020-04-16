import React from "react";
import MonthSummary from '../../../logic/MonthSummary';
import UnitTable from "./UnitTable";

class MonthTable extends UnitTable {
  constructor(props, context) {
    super(props, context, MonthSummary);
  }
}

export default MonthTable;
