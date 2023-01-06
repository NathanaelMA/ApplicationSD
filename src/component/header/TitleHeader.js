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
      // setCompareStates(false);
    } else setUSMainMap(false);
  }

  function handleCompare() {
    setCompareStates(true);
    setUSMainMap(false);
  }

  return (
    <div id="header-container">
      <h1>Infectious Disease Risk Predictor </h1>
      <button onClick={handleMapView}>
        <img src={logo}></img>
      </button>
      <button onClick={handleCompare}> Compare States</button>
      <CustomizedMenus />
    </div>
  );
}
