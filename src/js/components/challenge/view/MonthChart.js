import React from "react";
import MonthSummary from "../../../logic/MonthSummary";
import UnitChart from "./UnitChart";

class MonthChart extends UnitChart {
  constructor(props, context) {
    super(props, context, MonthSummary);
  }
}

export default MonthChart;
