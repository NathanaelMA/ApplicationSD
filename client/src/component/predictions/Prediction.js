import React, { useContext, useEffect } from "react";
import "./Prediction.css";
import { AppContext } from "../pages/DiseaseApp";
import { Doughnut, Line, PolarArea } from "react-chartjs-2";
import "chart.js/auto";
import Axios from "axios";

export default function predication() {
  // const { rankingPage, diseaseType } = useContext(AppContext);

  let diseaseType = "covid";

  // useEffect(() => {
  //   Axios.get(
  //     "http://127.0.0.1:3001/getCurrentWeekTotal?diseaseType=" + diseaseType
  //   ).then((response) => {
  //     console.log(response.data);
  //     setCases([]);
  //     for (let j = 0; j < response.data.length; j++) {
  //       response.data[j].disease === "covid" &&
  //         setCovidTotals(response.data[j].CasesInWeek);

  //       response.data[j].disease === "campylobacteriosis" &&
  //         setCampylobacteriosisTotals(response.data[j].CasesInWeek);

  //       response.data[j].disease === "chlamydia" &&
  //         setChlamydiaTotals(response.data[j].CasesInWeek);

  //       response.data[j].disease === "gonorrhea" &&
  //         setGonorrheaTotals(response.data[j].CasesInWeek);

  //       response.data[j].disease === "malaria" &&
  //         setMalariaTotals(response.data[j].CasesInWeek);

  //       response.data[j].disease === "pneumococcal" &&
  //         setPneumoccalTotals(response.data[j].CasesInWeek);

  //       response.data[j].disease === "syphilis" &&
  //         setSyphilisTotals(response.data[j].CasesInWeek);

  //       response.data[j].disease === "tuberculosis" &&
  //         setTuberculosisTotals(response.data[j].CasesInWeek);
  //     }
  //   });
  // }, []);

  return (
    <div id="cases-chart">
      <Line
        data={{
          labels: ["January", "February", "March", "April"],
          datasets: [
            {
              label: diseaseType + " Cases",
              data: [10, 25, 40, 60],
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(154, 16, 235)",
              order: 2,
            },
            {
              label: diseaseType + " Predictions",
              data: [null, null, 10, 15],
              backgroundColor: "rgb(25, 235, 132)",
              borderColor: "rgb(25, 235, 132)",
              order: 2,
            },
          ],
        }}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: "Months",
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}
