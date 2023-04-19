import React, { useState, useContext, useEffect } from "react";
import "./Prediction.css";
import { AppContext } from "../pages/DiseaseApp";
import { Doughnut, Line, PolarArea } from "react-chartjs-2";
import "chart.js/auto";
import Axios from "axios";

export default function Prediction() {
  const { diseaseType } = useContext(AppContext);
  const [date, setDate] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [cases, setCases] = useState([]);
  const [scroll, setScroll] = useState("true");
  const [year, setYear] = useState(null);
  const [futureDates, setFutureDates] = useState([]);

  useEffect(() => {
    setDate([]);
    setDeaths([]);
    setCases([]);
    setFutureDates([]);

    diseaseType &&
      Axios.get(
        "http://localhost:3001/getCurrentYear?diseaseType=" + diseaseType
      ).then((response) => {
        console.log(response.data);
        for (let j = 0; j < response.data.length; j++) {
          setDate((prevData) => [...prevData, response.data[j].week + " "]);
          diseaseType === "Covid"
            ? setDeaths((prevData) => [
                ...prevData,
                response.data[j].disease_deaths + " ",
              ])
            : setDeaths([]);
          setCases((prevData) => [
            ...prevData,
            response.data[j].CasesInWeek + " ",
          ]);
          setFutureDates((prevData) => [...prevData, null + " "]);
        }
      });
  }, [diseaseType]);

  return (
    <div id="cases-chart">
      {console.log(futureDates)}
      {console.log(date)}
      <Line
        data={{
          labels: [...date, 14, 15, 16, 17],
          datasets: [
            {
              label: diseaseType + " Cases",
              data: [...cases],
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(154, 16, 235)",
              order: 2,
            },
            {
              label: diseaseType + " Predictions",
              data: [...futureDates, 1502, 35431],
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
