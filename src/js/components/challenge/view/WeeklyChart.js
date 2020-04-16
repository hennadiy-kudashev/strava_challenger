import React from "react";
import WeeklySummary from "../../../logic/WeeklySummary";
import UnitChart from "./UnitChart";

class WeeklyChart extends UnitChart {
  constructor(props, context) {
    super(props, context, WeeklySummary);
  }
}

export default WeeklyChart;
