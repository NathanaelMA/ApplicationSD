import React, { useContext } from "react";
import "./TitleHeader.css";
import { AppContext } from "../pages/DiseaseApp";
export default function TitleHeader() {
  const {
    setChangeMapColor,
    setChoosenState,
    setUSMainMap,
    setDiseaseType,
    setCompareStates,
    theme,
    setRankingPage,
  } = useContext(AppContext);

  function handleHome() {
    setChoosenState(null);
    setUSMainMap(true);
    setRankingPage(true);
    setCompareStates(false);
    setChangeMapColor(true);
  }

  function handleCompare() {
    setCompareStates(true);
    setUSMainMap(false);
    setRankingPage(false);
  }
  function handleDiseaseSelection(e) {
    setDiseaseType(e.target.value);
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
                <option value="gonorrhea">Gonorrhea</option>
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
