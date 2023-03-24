import React, { useContext, useState, useEffect } from "react";
import "./DataViewLeft.css";
import { AppContext } from "../pages/DiseaseApp";
import { motion, AnimatePresence } from "framer-motion";
//all states data for january
import Folder from "../../InfectiousDiseaseDataSets-main/Diseases2022Data/CovidData/month01.csv";
import Papa from "papaparse";
import { Line } from "react-chartjs-2";
import { csv } from "d3";
import ChartDisplay from "../chart/ChartDisplay";
export default function DataViewLeft() {
  const {
    rankingPage,
    choosenState,
    setChoosenState,
    diseaseType,
    compareStates,
    theme,
  } = useContext(AppContext);
  const [displayData, setDisplayData] = useState([]);
  const [dropDownState, setDropDownState] = useState(null);
  const [CSVData, setCSVData] = useState(null);
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

  //used for state selected from main map view
  function chooseStateData(e) {
    let stateName = e.target.selectedOptions[0].text;
    setDropDownState(stateName);

    setDisplayData([]);
    setDate([]);
    setDeaths([]);
    setCases([]);
    if (CSVData) {
      for (let j = 0; j < CSVData.length; j++) {
        if (CSVData[j].state === stateName) {
          setDate((prevData) => [...prevData, CSVData[j].date + " "]);
          setDeaths((prevData) => [...prevData, CSVData[j].deaths + " "]);
          setCases((prevData) => [...prevData, CSVData[j].cases + " "]);
          setDisplayData((prevData) => [...prevData, CSVData[j].deaths + " "]);
        }
      }
    }
  }

  // using d3 parse the csv file with the name folder and return the data
  useEffect(() => {
    const row = (d) => {
      d.deaths = +d.deaths;
      d.cases = +d.cases;
      return d;
    };

    csv(Folder, row).then((data) => {
      setCSVData(data);
    });
  }, []);

  //used for comparison view
  useEffect(() => {
    if (diseaseType === "Covid" && !compareStates) setScroll("true");
    else setScroll("false");

    if (compareStates) {
      setChoosenState(null);
      setDeaths([]);
      setCases([]);
      setDate([]);
      setDisplayData([]);
    }

    if (choosenState) {
      let displayStateData = states.find(
        (state) => state[1] === choosenState.id
      );
      setDate([]);
      setDeaths([]);
      setCases([]);
      if (CSVData) {
        for (let j = 0; j < CSVData.length; j++) {
          if (CSVData[j].state === displayStateData[0]) {
            setDate((prevData) => [...prevData, CSVData[j].date + " "]);
            setDeaths((prevData) => [...prevData, CSVData[j].deaths + " "]);
            setCases((prevData) => [...prevData, CSVData[j].cases + " "]);
          }
        }
      }
    }
  }, [choosenState, compareStates, diseaseType]);

  return (
    <>
      <AnimatePresence>
        {(compareStates || choosenState) && !rankingPage && (
          <motion.div
            className="data-section"
            theme-value={theme}
            layout
            initial={{ x: "-70%" }}
            animate={{ x: "0%", transition: { duration: 2 } }}
            // exit={{ x: "-70%", transition: { duration: 1 } }}
            active-state={JSON.stringify(compareStates)}
          >
            {compareStates && (
              <div className="form-group">
                <label htmlFor="state" className="col-sm-4 control-label">
                  <p theme-value={theme}> Pick a State to view Data </p>
                </label>
                <div className="col-sm-5">
                  <select
                    className="form-control"
                    id="state"
                    name="state"
                    onChange={chooseStateData}
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
              </div>
            )}
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
