import React, { useContext, useState, useEffect } from "react";
import "./DataViewLeft.css";
import { AppContext } from "../pages/DiseaseApp";
import { motion, AnimatePresence } from "framer-motion";
import Folder from "../../InfectiousDiseaseDataSets-main/Diseases2022Data/CovidData/month01.csv";
import Papa from "papaparse";
import ChartDisplay from "../chart/ChartDisplay";

export default function DataViewLeft() {
  const { choosenState, diseaseType, compareStates, theme } =
    useContext(AppContext);
  const [displayData, setDisplayData] = useState([]);

  const [CSVData, setCSVData] = useState(null);
  const [run, setRun] = useState(false);
  const [stateName, setStateName] = useState(null);

  function chooseStateData(e) {
    setDisplayData(e.target.value);
  }
  const states = [
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["American Samoa", "AS"],
    ["Arizona", "AZ"],
    ["Arkansas", "AR"],
    ["Armed Forces Americas", "AA"],
    ["Armed Forces Europe", "AE"],
    ["Armed Forces Pacific", "AP"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["District Of Columbia", "DC"],
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
    ["Marshall Islands", "MH"],
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
    ["Northern Mariana Islands", "NP"],
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
    ["US Virgin Islands", "VI"],
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"],
  ];

  //parse the csv file with the name folder and return the data
  useEffect(() => {
    Papa.parse(Folder, {
      download: true,
      header: true,
      complete: function (results) {
        setCSVData(results.data);
        setRun(true);
      },
    });
  }, []);

  useEffect(() => {
    if (choosenState) {
      setDisplayData([]);
      for (let i = 0; i < states.length; i++) {
        if (states[i][1] === choosenState.id) {
          if (CSVData) {
            //loop through csvdata and print all the states names Alabama
            for (let j = 0; j < CSVData.length; j++) {
              if (CSVData[j].state === states[i][0]) {
                setStateName(CSVData[j].state);
                setDisplayData((prevData) => [...prevData, CSVData[j].deaths]);
              }
            }
          }
        }
      }
    }
  }, [choosenState, run]);

  return (
    <>
      <AnimatePresence>
        {(compareStates || choosenState) && (
          <motion.div
            className="data-section"
            theme-value={theme}
            layout
            initial={{ width: "0%" }}
            animate={{ width: "50%", transition: { duration: 2 } }}
            exit={{ width: "10%", transition: { duration: 2 } }}
            active-state={JSON.stringify(compareStates)}
          >
            <p theme-value={theme}> {diseaseType}</p>
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
            <motion.div
              id="display-state-data"
              theme-value={theme}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 2 } }}
              exit={{ width: "10%", transition: { duration: 2 } }}
            >
              <p theme-value={theme}>{stateName} </p>
              <motion.p theme-value={theme}> {displayData} </motion.p>
              {/* <ChartDisplay /> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
