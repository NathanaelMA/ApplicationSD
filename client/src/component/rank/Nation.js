import React, { useContext, useEffect, useState, useMemo } from "react";
import "./Nation.css";
import { motion } from "framer-motion";
import { AppContext } from "../pages/DiseaseApp";
import { Line, PolarArea } from "react-chartjs-2";
import StateRanking from "./StateRanking";
import "chart.js/auto";
import Axios from "axios";

export default function Nation() {
  const { rankingPage, diseaseType } = useContext(AppContext);
  const [openView, setOpenView] = useState();
  const [states, setStates] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [cases, setCases] = useState([]);
  const [covidTotals, setCovidTotals] = useState([]);
  const [measlesTotals, setMeaslesTotals] = useState([]);
  const [malariaTotals, setMalariaTotals] = useState([]);
  const [mumpsTotals, setMumpsTotals] = useState([]);
  const [pneumoccalTotals, setPneumoccalTotals] = useState([]);
  const [syphilisTotals, setSyphilisTotals] = useState([]);
  const [tuberculosisTotals, setTuberculosisTotals] = useState([]);

  useEffect(() => {
    Axios.get(
      "http://127.0.0.1:3001/getYearlyTotal?diseaseType=" + diseaseType
    ).then((response) => {
      setCases([]);
      for (let j = 0; j < response.data.length; j++) {
        response.data[j].disease === "covid" &&
          response.data[j].disease === "covid" &&
          response.data[j].year === 2022 &&
          setCovidTotals(response.data[j].CasesInYear);

        response.data[j].disease === "Measles" &&
          setMeaslesTotals(response.data[j].CasesInYear);

        response.data[j].disease === "Malaria" &&
          setMalariaTotals(response.data[j].CasesInYear);

        response.data[j].disease === "Mumps" &&
          setMumpsTotals(response.data[j].CasesInYear);

        response.data[j].disease === "Pneumococcal disease" &&
          setPneumoccalTotals(response.data[j].CasesInYear);

        response.data[j].disease === "CSyphilis" &&
          setSyphilisTotals(response.data[j].CasesInYear);

        response.data[j].disease === "Tuberculosis" &&
          setTuberculosisTotals(response.data[j].CasesInYear);
      }
    });
  }, []);

  return (
    rankingPage && (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.7 } }}
      >
        <div id="case-charts">
          <PolarArea
            data={{
              labels: [
                "Covid",
                "Measles",
                "Malaria",
                "Mumps",
                "Pneumoccal Diseases",
                "Syphilis",
                "Tuberculosis",
              ],
              datasets: [
                {
                  label: "Cases",
                  data: [
                    54512,
                    measlesTotals,
                    malariaTotals,
                    mumpsTotals,
                    pneumoccalTotals,
                    syphilisTotals,
                    tuberculosisTotals,
                  ],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 99, 132, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            height={400}
            width={600}
          />
          <StateRanking />
        </div>

        <div id="cases-chart">
          {diseaseType === "Covid" ? (
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
                    label: diseaseType + " Deaths",
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
          ) : (
            <Line
              data={{
                labels: [...weeks],
                datasets: [
                  {
                    label: diseaseType + " Cases",
                    data: [...cases],
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(154, 16, 235)",
                    order: 2,
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "weeks",
                    },
                  },
                },
              }}
            />
          )}
        </div>
      </motion.div>
    )
  );
}
