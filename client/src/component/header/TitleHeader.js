import React, { useContext, useState } from "react";
import "./TitleHeader.css";
import Maplogo from "../../images/NAMap.png";
import scalelogo from "../../images/scale.png";
import Rank from "../../images/rank.png";
import { AppContext } from "../pages/DiseaseApp";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useQuery } from "react-query";
export default function TitleHeader() {
  const {
    choosenState,
    setChoosenState,
    choosenStateName,
    setChoosenStateName,
    choosenStateTitle,
    USMainMap,
    setUSMainMap,
    diseaseType,
    setDiseaseType,
    compareStates,
    setCompareStates,
    theme,
    setTheme,
    rankingPage,
    setRankingPage,
  } = useContext(AppContext);

  async function getDiseaseData() {
    await Axios.get(
      "http://127.0.0.1:3001/get?diseaseType=" + diseaseType
    ).then((response) => {
      console.log(response.data);
      return response.data;
    });
  }

  const { data, isLoading, isError } = useQuery("diseaseData", () =>
    getDiseaseData()
  );

  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    theme === "Dark" ? setTheme("Light") : setTheme("Dark");
    setIsOn(!isOn);
  };

  // const spring = {
  //   type: "spring",
  //   stiffness: 700,
  //   damping: 30,
  // };

  // async function sendRequest() {
  //   await Axios.post("http://localhost:3001/post", {
  //     diseaseType: diseaseType,
  //     state: choosenStateName,
  //   });
  // }

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
    console.log(e.target.value);
    // sendRequest();
    getDiseaseData();
  }

  function handleRanking() {
    setCompareStates(false);
    setRankingPage(true);
    console.log(data);
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <nav id="header-container" theme-value={theme}>
      <Link to={"/"}>
        <header id="home" theme-value={theme}>
          Home
        </header>
      </Link>
      <h1 theme-value={theme}>Infectious Disease Risk Predictor </h1>
      <div id="nav-items" theme-value={theme}>
        <img className="logo" src={Maplogo} onClick={handleMapView}></img>
        <img className="logo" src={scalelogo} onClick={handleCompare}></img>
        <img className="logo" src={Rank} onClick={handleRanking}></img>
        <button onClick={getDiseaseData}>get Disease</button>
        <span className="col-sm-2">
          <select
            id="diseases"
            theme-value={theme}
            onChange={handleDiseaseSelection}
          >
            {/* <option value="">Choose Disease Type</option> */}
            <option value="Covid">Covid</option>
            <option value="Measles">Measles</option>
            <option value="Malaria">Malaria</option>
            <option value="Mumps">Mumps</option>
            <option value="Pneumococcal disease">Pneumococcal Diseases</option>
            <option value="CSyphilis">Syphilis</option>
            <option value="Tuberculosis">Tuberculosis</option>
          </select>
        </span>
        {/* <div className="switch" data-is-on={isOn} onClick={toggleSwitch}>
          <motion.div className="handle" layout transition={spring} />
        </div> */}
        {/* <p theme-value={theme}>{theme} Mode</p> */}
      </div>
    </nav>
  );
}
