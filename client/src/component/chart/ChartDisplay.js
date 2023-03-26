import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "./ChartDisplay.css";
import { AppContext } from "../pages/DiseaseApp";

//not used - moved to dataViewRight & dataViewLeft
export default function ChartDisplay() {
  const { date, setDate, deaths, setDeaths } = useContext(AppContext);
  return (
    <div id="line-chart">
      <Line
        datasetIdKey="id"
        data={{
          labels: [...date],
          datasets: [
            {
              id: 1,
              label: "Covid Deaths",
              data: [...deaths],
            },
          ],
        }}
      />
    </div>
  );
}
