import React, { useContext, useState } from "react";
import "./TitleHeader.css";
import Maplogo from "../../images/NAMap.png";
import scalelogo from "../../images/scale.png";
import Rank from "../../images/rank.png";
import { AppContext } from "../pages/DiseaseApp";
import { Link } from "react-router-dom";
import Axios from "axios";
export default function TitleHeader() {
  const {
    choosenState,
    setUSMainMap,
    setDiseaseType,
    compareStates,
    setCompareStates,
    theme,
    setTheme,
    rankingPage,
    setRankingPage,
  } = useContext(AppContext);

  const [isOn, setIsOn] = useState(false);

  // const toggleSwitch = () => {
  //   theme === "Dark" ? setTheme("Light") : setTheme("Dark");
  //   setIsOn(!isOn);
  // };

  // const spring = {
  //   type: "spring",
  //   stiffness: 700,
  //   damping: 30,
  // };

  function handleMapView() {
    if (choosenState || compareStates || rankingPage) {
      setUSMainMap(true);
      setCompareStates(false);
      setRankingPage(false);
    } else {
      setUSMainMap(false);
    }
  }

  function handleCompare() {
    setCompareStates(true);
    setUSMainMap(false);
    setRankingPage(false);
  }
  function handleDiseaseSelection(e) {
    setDiseaseType(e.target.value);
  }

  function handleRanking() {
    setCompareStates(false);
    setRankingPage(true);
  }

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll">
            Infectious Disease Risk Predictor
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a className="page-scroll" onClick={handleRanking}>
                Nation
              </a>
            </li>
            <li>
              <a className="page-scroll" onClick={handleMapView}>
                Map
              </a>
            </li>
            <li>
              <a className="page-scroll" onClick={handleCompare}>
                Compare
              </a>
            </li>

            <span>
              <select
                id="diseases"
                className="page-scroll"
                theme-value={theme}
                onChange={handleDiseaseSelection}
              >
                <option value="Covid">Covid</option>
                <option value="Measles">Measles</option>
                <option value="Malaria">Malaria</option>
                <option value="Mumps">Mumps</option>
                <option value="Pneumococcal disease">
                  Pneumococcal Diseases
                </option>
                <option value="CSyphilis">Syphilis</option>
                <option value="Tuberculosis">Tuberculosis</option>
              </select>
            </span>
          </ul>
        </div>
      </div>
    </nav>
  );
}
