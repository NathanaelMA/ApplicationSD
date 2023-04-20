import React, { useContext, useState, useEffect } from "react";
import "./ChoosenStateView.css";
import { AppContext } from "../pages/DiseaseApp";
import { motion, AnimatePresence } from "framer-motion";
import { Line } from "react-chartjs-2";
import Axios from "axios";
export default function ChoosenStateView() {
  const {
    rankingPage,
    choosenState,
    USMainMap,
    setChoosenState,
    diseaseType,
    compareStates,
    theme,
  } = useContext(AppContext);
  const [date, setDate] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [cases, setCases] = useState([]);
  const [scroll, setScroll] = useState("true");
  const [year, setYear] = useState(null);

  const states = [
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["Arizona", "AZ"],
    ["Arkansas", "AR"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["Florida", "FL"],
    ["Georgia", "GA"],
    ["Guam", "GU"],
    ["Hawaii", "HI"],
    ["Idaho", "ID"],
    ["Illinois", "IL"],
    ["Indiana", "IN"],
    ["Iowa", "IA"],
    ["Kansas", "KS"],
    ["Kentucky", "KY"],
    ["Louisiana", "LA"],
    ["Maine", "ME"],
    ["Maryland", "MD"],
    ["Massachusetts", "MA"],
    ["Michigan", "MI"],
    ["Minnesota", "MN"],
    ["Mississippi", "MS"],
    ["Missouri", "MO"],
    ["Montana", "MT"],
    ["Nebraska", "NE"],
    ["Nevada", "NV"],
    ["New Hampshire", "NH"],
    ["New Jersey", "NJ"],
    ["New Mexico", "NM"],
    ["New York", "NY"],
    ["North Carolina", "NC"],
    ["North Dakota", "ND"],
    ["Ohio", "OH"],
    ["Oklahoma", "OK"],
    ["Oregon", "OR"],
    ["Pennsylvania", "PA"],
    ["Puerto Rico", "PR"],
    ["Rhode Island", "RI"],
    ["South Carolina", "SC"],
    ["South Dakota", "SD"],
    ["Tennessee", "TN"],
    ["Texas", "TX"],
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"],
  ];

  useEffect(() => {
    let serverStateName;

    compareStates ? setChoosenState(null) : setChoosenState(choosenState);

    if (choosenState) {
      diseaseType === "covid" ? setScroll("true") : setScroll("false");

      serverStateName = states.find((state) => state[1] === choosenState.id)[0];

      setDate([]);
      setDeaths([]);
      setCases([]);
      diseaseType &&
        serverStateName &&
        year &&
        Axios.get(
          "http://localhost:3001/getTotalNonGrowing?diseaseType=" +
            diseaseType +
            "&choosenState=" +
            serverStateName +
            "&year=" +
            year
        ).then((response) => {
          for (let j = 0; j < response.data.length; j++) {
            if (response.data[j].state === serverStateName) {
              setDate((prevData) => [...prevData, response.data[j].week + " "]);
              diseaseType === "Covid"
                ? setDeaths((prevData) => [
                    ...prevData,
                    response.data[j].disease_deaths + " ",
                  ])
                : setDeaths([]);
              setCases((prevData) => [
                ...prevData,
                response.data[j].disease_cases + " ",
              ]);
            }
          }
        });
    } else {
      setYear(null);
    }
  }, [choosenState, compareStates, diseaseType, year]);

  return (
    <>
      <AnimatePresence>
        {choosenState && (
          <motion.div
            className="data-section"
            theme-value={theme}
            layout
            active-state={JSON.stringify(compareStates)}
          >
            <div id="year-selector">
              <div className="col-sm-5">
                <select
                  className="form-control"
                  id="year"
                  name="year"
                  onChange={(e) => setYear(e.target.selectedOptions[0].text)}
                >
                  <option value="">Choose Year</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
              </div>
            </div>
            <div
              id="left-display-state-data"
              theme-value={theme}
              scroll-value={scroll}
            >
              <Line
                datasetIdKey="id"
                data={{
                  labels: [...date],
                  datasets: [
                    {
                      id: 1,
                      label:
                        diseaseType[0].toUpperCase() +
                        diseaseType.slice(1) +
                        " Cases",
                      data: [...cases],
                      fill: true,
                      pointRadius: 0.5,
                      lineTension: 0.5,
                    },
                  ],
                }}
                options={{
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Week",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Cases",
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
              {diseaseType === "covid" && (
                <Line
                  datasetIdKey="id"
                  data={{
                    labels: [...date],
                    datasets: [
                      {
                        id: 1,
                        label:
                          diseaseType[0].toUpperCase() +
                          diseaseType.slice(1) +
                          " Deaths",
                        data: [...deaths],
                        fill: true,
                        pointRadius: 0.5,
                        lineTension: 0.5,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Week",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Cases",
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
              )}
              {/* <h1> % of Population infected</h1>
              <h2>total confirmed cases</h2> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
