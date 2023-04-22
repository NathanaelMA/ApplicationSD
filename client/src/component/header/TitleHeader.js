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
    setChoosenState,
    setUSMainMap,
    setDiseaseType,
    setCompareStates,
    theme,
    setRankingPage,
  } = useContext(AppContext);

  const [selectedDisease, setSelectedDisease] = useState("covid");

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
    setDiseaseType(e.target.dataset.value);
    setSelectedDisease(e.target.dataset.value);
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
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
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
          </ul>
        </div>

        <div id="disease_list">
          <a
            className="virus"
            id={selectedDisease === "covid" ? "selected-disease" : ""}
            data-value="covid"
            onClick={handleDiseaseSelection}
          >
            Covid
          </a>
          <a
            className="virus"
            id={
              selectedDisease === "campylobacteriosis" ? "selected-disease" : ""
            }
            data-value="campylobacteriosis"
            onClick={handleDiseaseSelection}
          >
            Campylobacteriosis
          </a>
          <a
            className="virus"
            id={selectedDisease === "chlamydia" ? "selected-disease" : ""}
            data-value="chlamydia"
            onClick={handleDiseaseSelection}
          >
            Chlamydia
          </a>
          <a
            className="virus"
            id={selectedDisease === "gonorrhea" ? "selected-disease" : ""}
            data-value="gonorrhea"
            onClick={handleDiseaseSelection}
          >
            Gonorrhea
          </a>
          <a
            className="virus"
            id={selectedDisease === "malaria" ? "selected-disease" : ""}
            data-value="malaria"
            onClick={handleDiseaseSelection}
          >
            Malaria
          </a>
          <a
            className="virus"
            id={selectedDisease === "pneumococcal" ? "selected-disease" : ""}
            data-value="pneumococcal"
            onClick={handleDiseaseSelection}
          >
            Pneumococcal Diseases
          </a>
          <a
            className="virus"
            id={selectedDisease === "syphilis" ? "selected-disease" : ""}
            data-value="syphilis"
            onClick={handleDiseaseSelection}
          >
            Syphilis
          </a>
          <a
            className="virus"
            id={selectedDisease === "tuberculosis" ? "selected-disease" : ""}
            data-value="tuberculosis"
            onClick={handleDiseaseSelection}
          >
            Tuberculosis
          </a>
        </div>
      </div>
    </nav>
  );
}
