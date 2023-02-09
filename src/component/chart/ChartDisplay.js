import React from "react";
import { Line } from "react-chartjs-2";
import "./ChartDisplay.css";

export default function ChartDisplay() {
  return (
    <div id="line-chart">
      <Line
        datasetIdKey="id"
        data={{
          labels: ["Jun", "Jul", "Aug"],
          datasets: [
            {
              id: 1,
              label: "",
              data: [5, 6, 7],
            },
            {
              id: 2,
              label: "",
              data: [3, 2, 1],
            },
          ],
        }}
      />
    </div>
  );
}
