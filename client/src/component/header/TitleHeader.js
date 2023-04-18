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
    setChoosenState,
    USMainMap,
    setUSMainMap,
    setDiseaseType,
    compareStates,
    setCompareStates,
    theme,
    setTheme,
    rankingPage,
    setRankingPage,
  } = useContext(AppContext);

  function handleMapView() {
    setUSMainMap(true);
    setCompareStates(false);
    setRankingPage(false);
  }

  function handleHome() {
    setChoosenState(null);
    setUSMainMap(true);
    setRankingPage(true);
    setCompareStates(false);
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
    setUSMainMap(false);
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
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll">
            Infectious Disease Risk Predictor
          </a>
        </div>
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            {/* <li>
              <a className="page-scroll" onClick={handleRanking}>
                Nation
              </a>
            </li> */}
            <li>
              <a className="page-scroll" onClick={handleHome}>
                Home
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
                <option value="covid">Covid</option>
                <option value="campylobacteriosis">Campylobacteriosis</option>
                <option value="chlamydia">Chlamydia</option>
                <option value="gonorrhea">gonorrhea</option>
                <option value="malaria">Malaria</option>
                <option value="pneumococcal">Pneumococcal Diseases</option>
                <option value="syphilis">Syphilis</option>
                <option value="tuberculosis">Tuberculosis</option>
              </select>
            </span>
          </ul>
        </div>
      </div>
    </nav>
  );
}
