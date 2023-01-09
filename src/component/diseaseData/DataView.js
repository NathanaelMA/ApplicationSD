import React, { useContext, useState } from "react";
import "./DataView.css";
import { AppContext } from "../pages/DiseaseApp";
import { motion, AnimatePresence } from "framer-motion";

export default function DataView() {
  const { choosenState, diseaseType, compareStates } = useContext(AppContext);
  const [displayData, setDisplayData] = useState(null);
  function chooseStateData(e) {
    setDisplayData(e.target.value);
  }
  return (
    <>
      {/* <AnimatePresence>
        {(compareStates || choosenState) && ( */}
      {console.log(compareStates)}
      <motion.div
        className="data-section"
        layout
        activeState={JSON.stringify(compareStates)}
      >
        <p> {diseaseType}</p>
        <div className="form-group">
          <label htmlFor="state" className="col-sm-4 control-label">
            <p> Pick a State to view Data </p>
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
        <p> {displayData} </p>
      </motion.div>
      {/* )}
      </AnimatePresence> */}
    </>
  );
}
