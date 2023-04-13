import "./DiseaseApp.css";
import React from "react";
import TitleHeader from "../header/TitleHeader";
import ComparisonLeft from "../diseaseData/ComparisonLeft";
import ComparisonRight from "../diseaseData/ComparisonRight";
import Map from "../map/Map";
import ColorLegend from "../map/ColorLegend";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Rank from "../rank/Rank";
import ChoosenStateView from "../diseaseData/ChoosenStateView";

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
  const [rankingPage, setRankingPage] = useState(false);
  const [choosenStateName, setChoosenStateName] = useState("");

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

  return (
    <AnimatePresence>
      <motion.div exit={{ y: window.innerWidth, transition: { duration: 1 } }}>
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
          }}
        >
          <TitleHeader />

          <div className="main-container" theme-value={theme}>
            <ComparisonLeft />
            <ChoosenStateView />
            <Map />
            <ComparisonRight />
            <Rank />
          </div>
        </AppContext.Provider>
      </motion.div>
    </AnimatePresence>
  );
}
