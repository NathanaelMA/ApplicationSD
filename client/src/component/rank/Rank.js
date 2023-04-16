import React, { useContext, useEffect, useState, useMemo } from "react";
import "./Rank.css";
import { motion } from "framer-motion";
import { AppContext } from "../pages/DiseaseApp";
import { Line, PolarArea } from "react-chartjs-2";
import StateRanking from "./StateRanking";
import "chart.js/auto";
import Axios from "axios";

export default function Rank() {
  const { rankingPage, diseaseType } = useContext(AppContext);
  const [openView, setOpenView] = useState();
  const [states, setStates] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    setCases([]);
    setWeeks([]);

    Axios.get(
      "http://127.0.0.1:3001/getTotals?diseaseType=" + diseaseType
    ).then((response) => {
      for (let j = 0; j < response.data.length; j++) {
        setWeeks((prevData) => [...prevData, response.data[j].week + " "]);
        setCases((prevData) => [
          ...prevData,
          response.data[j].total_cases + " ",
        ]);
      }
    });
  }, [diseaseType]);

  useEffect(() => {
    rankingPage ? setOpenView(true) : setOpenView(false);
  }, [rankingPage]);

  return (
    openView && (
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
                  data: [12, 19, 7, 5, 10, 15, 4],
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
                    data: [15, 25, 10, 25],
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(154, 16, 235)",
                    order: 2,
                  },
                  {
                    label: diseaseType + " Deaths",
                    data: [5, 2, 10, 15],
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
                    stacked: true,
                  },
                  y: {
                    beginAtZero: true,
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
