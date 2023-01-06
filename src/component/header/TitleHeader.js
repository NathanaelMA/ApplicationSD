import React, { useContext } from "react";
import "./TitleHeader.css";
import logo from "../../images/favicon.png";
import CustomizedMenus from "../CustomizedMenus";
import { AppContext } from "../../App";
import "bootstrap/dist/css/bootstrap.min.css";
export default function TitleHeader() {
  const {
    choosenState,
    choosenStateTitle,
    USMainMap,
    setUSMainMap,
    setDiseaseType,
    compareStates,
    setCompareStates,
  } = useContext(AppContext);
  function handleMapView() {
    if (choosenState || compareStates) {
      setUSMainMap(true);
      setCompareStates(false);
    } else setUSMainMap(false);
  }

  function handleCompare() {
    setCompareStates(true);
    setUSMainMap(false);
  }
  function runThis(e) {
    console.log(e.target.value);
    setDiseaseType(e.target.value);
  }

  return (
    <div id="header-container">
      <h1>Infectious Disease Risk Predictor </h1>
      <button onClick={handleMapView}>
        <img src={logo}></img>
      </button>
      <button onClick={handleCompare}> Compare States</button>
      {/* <CustomizedMenus /> */}

      <div className="col-sm-2">
        <select
          className="form-control"
          id="state"
          name="state"
          onChange={runThis}
        >
          <option value="">Choose Disease Type</option>
          <option value="Covid">Covid</option>
          <option value="Covid2">ACovid</option>
          <option value="Covid3">ArCovid</option>
          <option value="Covid4">ACovid</option>
          <option value="Covid5">CaliCovid</option>
        </select>
      </div>
    </div>
  );
}
