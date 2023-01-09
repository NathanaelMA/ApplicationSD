import React, { useContext } from "react";
import "./TitleHeader.css";
import Maplogo from "../../images/NAMap.png";
import scalelogo from "../../images/scale.png";
import { AppContext } from "../pages/DiseaseApp";
import { Link } from "react-router-dom";
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
  function handleDiseaseSelection(e) {
    console.log(e.target.value);
    setDiseaseType(e.target.value);
  }

  return (
    <nav id="header-container">
      <Link to={"/"}>
        <header id="home">Home</header>
      </Link>
      <h1>Infectious Disease Risk Predictor </h1>
      <div id="nav-items">
        <img className="logo" src={Maplogo} onClick={handleMapView}></img>
        <img className="logo" src={scalelogo} onClick={handleCompare}></img>
        <span className="col-sm-2">
          <select id="diseases" onChange={handleDiseaseSelection}>
            <option value="">Choose Disease Type</option>
            <option value="Covid">Covid</option>
            <option value="Covid2">ACovid</option>
            <option value="Covid3">ArCovid</option>
            <option value="Covid4">ACovid</option>
            <option value="Covid5">CaliCovid</option>
          </select>
        </span>
      </div>
    </nav>
  );
}
