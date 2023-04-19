import "./DiseaseApp.css";
import React from "react";
import TitleHeader from "../header/TitleHeader";
import ComparisonLeft from "../diseaseData/ComparisonLeft";
import ComparisonRight from "../diseaseData/ComparisonRight";
import Map from "../map/Map";
import ColorLegend from "../map/ColorLegend";
import { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
import Rank from "../rank/Nation";
import ChoosenStateView from "../diseaseData/ChoosenStateView";
import Team from "../team/Team";
import Nation from "../rank/Nation";
import Prediction from "../predictions/Prediction";

export const AppContext = React.createContext();
export default function DiseaseApp() {
  const [choosenState, setChoosenState] = useState(null);
  const [choosenStateTitle, setChoosenStateTitle] = useState(null);
  const [USMainMap, setUSMainMap] = useState(true);
  const [diseaseType, setDiseaseType] = useState("Covid");
  const [compareStates, setCompareStates] = useState(false);
  const [theme, setTheme] = useState("Light");
  const [date, setDate] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [rankingPage, setRankingPage] = useState(true);
  const [choosenStateName, setChoosenStateName] = useState("");
  const [stackedDisplay, setStackedDisplay] = useState(false);

  //test

  // useEffect(() => {
  //   setDeaths([]);
  //   setCases([]);
  //   setDate([]);

  //   if (compareStates) {
  //     Axios.get(
  //       "http://localhost:3001/get?diseaseType=" +
  //         diseaseType +
  //         "&choosenState=" +
  //         dropDownState +
  //         "&year=" +
  //         year
  //     ).then((response) => {
  //       for (let j = 0; j < response.data.length; j++) {
  //         if (response.data[j].state === dropDownState) {
  //           setDate((prevData) => [...prevData, response.data[j].week + " "]);
  //           diseaseType === "Covid"
  //             ? setDeaths((prevData) => [
  //                 ...prevData,
  //                 response.data[j].disease_deaths + " ",
  //               ])
  //             : setDeaths([]);
  //           setCases((prevData) => [
  //             ...prevData,
  //             response.data[j].disease_cases + " ",
  //           ]);
  //         }
  //       }
  //     });
  //   } else setDropDownState(null);
  // }, [dropDownState, diseaseType, compareStates, year]);

  //end

  const ChoosenStatePicker = (currState) => {
    setChoosenState(currState);
  };
  useEffect(() => {
    const states_and_titles = Array.from(
      document.getElementsByClassName("usMap_svg")
    );

    const states = Array.from(
      document.getElementsByClassName("usMap_svg__sm_state ")
    );

    const stateTitles = Array.from(
      document.getElementsByClassName("usMap_svg__sm_label ")
    );

    states_and_titles.map((SaT) => {
      SaT.addEventListener("click", function () {
        const state = states.find((stateElem) => stateElem.id === SaT.id);
        ChoosenStatePicker(state);
        const stateTitle = stateTitles.find(
          (titleElem) => titleElem.id === SaT.id
        );
        setChoosenStateTitle(stateTitle);
      });
    });

    if (choosenState) {
      states_and_titles.map((SaT) => {
        SaT.removeEventListener("click", function () {
          const state = states.find((stateElem) => stateElem.id === SaT.id);
          ChoosenStatePicker(state);
          const stateTitle = stateTitles.find(
            (titleElem) => titleElem.id === SaT.id
          );
          setChoosenStateTitle(stateTitle);
        });
      });
    }
  }, [compareStates, rankingPage]);

  useEffect(() => {
    choosenState ? setStackedDisplay(true) : setStackedDisplay(false);
  });

  return (
    <AppContext.Provider
      value={{
        choosenState,
        setChoosenState,
        choosenStateName,
        setChoosenStateName,
        choosenStateTitle,
        setChoosenStateTitle,
        USMainMap,
        setUSMainMap,
        diseaseType,
        setDiseaseType,
        compareStates,
        setCompareStates,
        theme,
        setTheme,
        date,
        setDate,
        deaths,
        setDeaths,
        rankingPage,
        setRankingPage,
        stackedDisplay,
        setStackedDisplay,
      }}
    >
      <TitleHeader />

      <div id="main-container" theme-value={theme}>
        <ComparisonLeft />
        <ComparisonRight />
        <div id="map-nation" stack-display={stackedDisplay.toString()}>
          <div id="state-view">
            <ChoosenStateView />
            <Map />
          </div>
          <Nation />
        </div>
      </div>
      <Prediction />
      <Team />
    </AppContext.Provider>
  );
}
