import React, { useContext } from "react";
import { AppContext } from "../pages/DiseaseApp";
import * as d3 from "d3";
import "./LineChart.css";

export default function LineChart() {
  const { CSVData, CSVStatesData, compareStates } = useContext(AppContext);
  const height = 400;
  const width = 700;

  if (typeof CSVStatesData[0].date === "string") {
    const parseDate = d3.timeParse("%Y-%m-%d");

    CSVStatesData.forEach((d) => {
      d.date = parseDate(d.date);
    });
  }

  const maxDate = d3.max(CSVStatesData, (d) => d.date);
  const minDate = d3.min(CSVStatesData, (d) => d.date);
  const minDeath = d3.min(CSVStatesData, (d) => d.deaths);
  const maxDeath = d3.max(CSVStatesData, (d) => d.deaths);

  //   console.log(maxDate);
  //   console.log(minDate);
  //   console.log(minDeath);
  //   console.log(maxDeath);

  const y = d3.scaleLinear().domain([minDeath, maxDeath]).range([height, 0]);
  const x = d3.scaleTime().domain([minDate, maxDate]).range([0, width]);
  const yAxis = d3.axisLeft(y);
  const xAxis = d3.axisBottom(x);

  const svg = d3
    .select("svg")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("viewBox", [0, 0, width, height]);

  const chartGroup = svg.append("g").attr("transform", "translate(50, 50)");

  const line = d3
    .line()
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y(d.deaths);
    });

  chartGroup.append("path").attr("d", line(CSVStatesData));

  chartGroup
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis);
  chartGroup.append("g").attr("class", "y-axis").call(yAxis);

  return <>{compareStates ? <svg></svg> : null}</>;
}
