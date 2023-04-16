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
  const [dropDownState, setDropDownState] = useState(null);
  const [date, setDate] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [cases, setCases] = useState([]);
  const [scroll, setScroll] = useState("true");

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
      diseaseType === "Covid" ? setScroll("true") : setScroll("false");

      serverStateName = compareStates
        ? dropDownState
        : states.find((state) => state[1] === choosenState.id)[0];

      setDate([]);
      setDeaths([]);
      setCases([]);

      Axios.get(
        "http://127.0.0.1:3001/get?diseaseType=" +
          diseaseType +
          "&choosenState=" +
          serverStateName
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
    } else setDropDownState(null);
  }, [choosenState, compareStates, diseaseType, dropDownState]);

  return (
    <>
      <AnimatePresence>
        {choosenState && USMainMap && (
          <motion.div
            className="data-section"
            theme-value={theme}
            layout
            initial={{ x: "-70%" }}
            animate={{ x: "0%", transition: { duration: 2 } }}
            active-state={JSON.stringify(compareStates)}
          >
            <div
              id="left-display-state-data"
              theme-value={theme}
              scroll-value={scroll}
            >
              {diseaseType === "Covid" ? (
                <Line
                  datasetIdKey="id"
                  data={{
                    labels: [...date],
                    datasets: [
                      {
                        id: 1,
                        label: diseaseType + " Deaths",
                        data: [...deaths],
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
                          text: "Deaths",
                        },
                      },
                    },
                  }}
                />
              ) : null}

              <Line
                datasetIdKey="id"
                data={{
                  labels: [...date],
                  datasets: [
                    {
                      id: 1,
                      label: diseaseType + " Cases",
                      data: [...cases],
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
                }}
              />
              <h1> % of Population infected</h1>
              <h2>total confirmed cases</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
