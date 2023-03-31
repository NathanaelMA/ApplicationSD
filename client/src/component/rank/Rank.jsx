import React, { useContext } from "react";
import "./Rank.css";
import { motion } from "framer-motion";
import { AppContext } from "../pages/DiseaseApp";
import { Bar, Line, PolarArea } from "react-chartjs-2";

export default function Rank() {
  const { rankingPage, setRankingPage, diseaseType } = useContext(AppContext);
  return (
    rankingPage && (
      <motion.div
        layout
        initial={{ y: "-100%" }}
        animate={{ y: "0", transition: { duration: 0.7 } }}
        // exit={{ opacity: 0 }}
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

          <Bar
            data={{
              labels: ["January", "February", "March", "April"],
              datasets: [
                {
                  label: "State 1",
                  data: [15, 25, 10, 25],
                  backgroundColor: "rgb(255, 99, 132)",
                  borderColor: "rgb(154, 16, 235)",
                  order: 2,
                },
                {
                  label: "State 2",
                  data: [10, 20, 30, 50],
                  backgroundColor: "rgb(54, 162, 235)",
                  borderColor: "rgb(54, 162, 235)",
                  order: 1,
                },
                {
                  label: "State 3",
                  data: [5, 7, 15, 25],
                  backgroundColor: "rgb(254, 162, 235)",
                  borderColor: "rgb(54, 162, 235)",
                  order: 0,
                },
              ],
            }}
            height={400}
            width={600}
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
        </div>

        <div id="ranking-bottom-half">
          <div id="totals">
            <h1 id="disease-name"> {diseaseType} </h1>
            <div id="confirmed-cases">
              <h2> 102,544,598</h2>
              <p> confirmed cases </p>
            </div>
            {diseaseType === "Covid" ? (
              <div id="covid-deaths">
                <h2> 1,114,970</h2>
                <p> deaths </p>
              </div>
            ) : null}
          </div>
          {diseaseType === "Covid" ? (
            <Bar
              data={{
                labels: ["January", "February", "March", "April"],
                datasets: [
                  {
                    label: "State 1",
                    data: [15, 25, 10, 25],
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(154, 16, 235)",
                    order: 2,
                  },
                  {
                    label: "State 2",
                    data: [10, 20, 30, 50],
                    backgroundColor: "rgb(54, 162, 235)",
                    borderColor: "rgb(54, 162, 235)",
                    order: 1,
                  },
                  {
                    label: "State 3",
                    data: [5, 7, 15, 25],
                    backgroundColor: "rgb(254, 162, 235)",
                    borderColor: "rgb(54, 162, 235)",
                    order: 0,
                  },
                ],
              }}
              height={400}
              width={600}
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
          ) : (
            <Line
              data={{
                labels: ["January", "February", "March", "April"],
                datasets: [
                  {
                    label: "State 1",
                    data: [15, 25, 10, 25],
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(154, 16, 235)",
                    order: 2,
                  },
                ],
              }}
              height={400}
              width={600}
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
