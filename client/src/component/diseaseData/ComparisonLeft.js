import React, { useContext, useState, useEffect } from "react";
import "./ComparisonLeft.css";
import { AppContext } from "../pages/DiseaseApp";
import { motion, AnimatePresence } from "framer-motion";
import { Line } from "react-chartjs-2";
import Axios from "axios";
export default function ComparisonLeft() {
  const {
    rankingPage,
    choosenState,
    setCompareStates,
    diseaseType,
    compareStates,
    theme,
  } = useContext(AppContext);
  const [dropDownState, setDropDownState] = useState(null);
  const [year, setYear] = useState(null);
  const [date, setDate] = useState([]);

  const [cases, setCases] = useState([]);
  const [incrementingCases, setIncrementingCases] = useState([]);

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

    if (compareStates) {
      serverStateName = dropDownState;

      setDate([]);
      setCases([]);

      // weekly total
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
              // diseaseType === "Covid"
              //   ? setDeaths((prevData) => [
              //       ...prevData,
              //       response.data[j].disease_deaths + " ",
              //     ])
              //   : setDeaths([]);
              setCases((prevData) => [
                ...prevData,
                response.data[j].disease_cases + " ",
              ]);
            }
          }
        });

      //incrementing total
      diseaseType &&
        serverStateName &&
        year &&
        Axios.get(
          "http://localhost:3001/getIncrementingTotal?diseaseType=" +
            diseaseType +
            "&choosenState=" +
            serverStateName +
            "&year=" +
            year
        ).then((response) => {
          setIncrementingCases([]);
          setDate([]);
          for (let j = 0; j < response.data.length; j++) {
            // console.log(response.data);
            if (response.data[j].state === serverStateName) {
              setDate((prevData) => [...prevData, response.data[j].week + " "]);
              // diseaseType === "Covid"
              //   ? setDeaths((prevData) => [
              //       ...prevData,
              //       response.data[j].disease_deaths + " ",
              //     ])
              //   : setDeaths([]);
              setIncrementingCases((prevData) => [
                ...prevData,
                prevData.length === 0
                  ? 0
                  : prevData[prevData.length - 1] +
                    response.data[j].disease_cases,
              ]);
            }
          }
        });
    } else setDropDownState(null);
  }, [diseaseType, dropDownState, compareStates, year]);

  return (
    <>
      <AnimatePresence>
        {console.log(incrementingCases)}
        {compareStates && (
          <motion.div
            className="data-section"
            theme-value={theme}
            layout
            initial={{ x: "-70%" }}
            animate={{ x: "0%", transition: { duration: 2 } }}
            active-state={JSON.stringify(compareStates)}
          >
            <div id="left-comparison-dropdowns">
              <div className="col-sm-5">
                <select
                  className="form-control"
                  id="state"
                  name="state"
                  onChange={(e) =>
                    setDropDownState(e.target.selectedOptions[0].text)
                  }
                >
                  <option value="">Choose State</option>
                  <option value="AK">Alaska</option>
                  <option value="AL">Alabama</option>
                  <option value="AR">Arkansas</option>
                  <option value="AZ">Arizona</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DC">District of Columbia</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="IA">Iowa</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MD">Maryland</option>
                  <option value="ME">Maine</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MO">Missouri</option>
                  <option value="MS">Mississippi</option>
                  <option value="MT">Montana</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="NE">Nebraska</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NV">Nevada</option>
                  <option value="NY">New York</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VA">Virginia</option>
                  <option value="VT">Vermont</option>
                  <option value="WA">Washington</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WV">West Virginia</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>

              <div className="col-sm-5">
                <select
                  className="form-control"
                  id="year"
                  name="year"
                  onChange={(e) => setYear(e.target.selectedOptions[0].text)}
                >
                  <option value="">Choose Year</option>
                  <option value="">2020</option>
                  <option value="AK">2021</option>
                  <option value="AL">2022</option>
                  <option value="AR">2023</option>
                </select>
              </div>
            </div>

            <div
              id="left-display-state-data"
              theme-value={theme}
              // scroll-value={scroll}
            >
              <Line
                datasetIdKey="id"
                data={{
                  labels: [...date],
                  datasets: [
                    {
                      id: 1,
                      label: diseaseType + " total per year (non growing)",
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

              <Line
                datasetIdKey="id"
                data={{
                  labels: [...date],
                  datasets: [
                    {
                      id: 1,
                      label: diseaseType + " growing",
                      data: [...incrementingCases],
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
