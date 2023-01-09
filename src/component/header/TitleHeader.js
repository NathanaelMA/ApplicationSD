import React, { useContext, useState } from "react";
import "./TitleHeader.css";
import Maplogo from "../../images/NAMap.png";
import scalelogo from "../../images/scale.png";
import { AppContext } from "../pages/DiseaseApp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function TitleHeader() {
  const {
    choosenState,
    choosenStateTitle,
    USMainMap,
    setUSMainMap,
    setDiseaseType,
    compareStates,
    setCompareStates,
    theme,
    setTheme,
  } = useContext(AppContext);

  //new code

  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
    setIsOn(!isOn);
  };

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  //end code

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
    <nav id="header-container" themeValue={theme}>
      <Link to={"/"}>
        <header id="home" themeValue={theme}>
          Home
        </header>
      </Link>
      <h1 themeValue={theme}>Infectious Disease Risk Predictor </h1>
      <div id="nav-items" themeValue={theme}>
        <img className="logo" src={Maplogo} onClick={handleMapView}></img>
        <img className="logo" src={scalelogo} onClick={handleCompare}></img>
        <span className="col-sm-2">
          <select
            id="diseases"
            themeValue={theme}
            onChange={handleDiseaseSelection}
          >
            <option value="">Choose Disease Type</option>
            <option value="Covid">Covid</option>
            <option value="Covid2">Covid2</option>
            <option value="Covid3">Covid3</option>
            <option value="Covid4">Covid4</option>
            <option value="Covid5">Covid5</option>
          </select>
        </span>
        <div className="switch" data-is-on={isOn} onClick={toggleSwitch}>
          <motion.div className="handle" layout transition={spring} />
        </div>
      </div>
    </nav>
  );
}
