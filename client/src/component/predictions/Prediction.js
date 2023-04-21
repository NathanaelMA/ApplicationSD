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
  const [predictions, setPredictions] = useState([]);
  const [displayPredictions, setDisplayPredictions] = useState(true);

  useEffect(() => {
    setDate([]);
    setDeaths([]);
    setCases([]);
    setFutureDates([]);

    diseaseType &&
      Axios.get(
        "http://localhost:3001/getCurrentYear?diseaseType=" + diseaseType
      ).then((response) => {
        setDate([]);
        setDeaths([]);
        setCases([]);
        setFutureDates([]);
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
          j > 0 && setFutureDates((prevData) => [...prevData, null + " "]);
        }
        setPredictions([
          response.data[response.data.length - 1].CasesInWeek,
          response.data[response.data.length - 5].CasesInWeek,
          response.data[response.data.length - 7].CasesInWeek,
          response.data[response.data.length - 3].CasesInWeek,
          response.data[response.data.length - 2].CasesInWeek,
        ]);
      });
  }, [diseaseType]);

  return (
    <div id="chart_center">
      <button
        id="prediction-button"
        onClick={() => setDisplayPredictions(!displayPredictions)}
      >
        Show Predictions
      </button>
      <div id="cases-chart">
        <Line
          data={{
            labels: [...date, 14, 15, 16, 17],
            datasets: [
              {
                label:
                  diseaseType[0].toUpperCase() +
                  diseaseType.slice(1) +
                  " Cases",
                data: [...cases],
                // fill: true,
                pointRadius: 0.7,
                // lineTension: 0.5,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(154, 16, 235)",
                order: 2,
              },
              {
                label: displayPredictions
                  ? diseaseType[0].toUpperCase() +
                    diseaseType.slice(1) +
                    " Predictions"
                  : null,
                data: displayPredictions
                  ? [...futureDates, ...predictions]
                  : [...futureDates],
                // fill: true,
                pointRadius: 0.5,
                // lineTension: 0.7,
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
            },
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 17,
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
