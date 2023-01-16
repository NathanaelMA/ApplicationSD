import "./DiseaseApp.css";
import React from "react";
import TitleHeader from "../header/TitleHeader";
import DataViewLeft from "../diseaseData/DataViewLeft";
import DataViewRight from "../diseaseData/DataViewRight";
import Map from "../map/Map";
import ColorLegend from "../map/ColorLegend";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const AppContext = React.createContext();

export default function DiseaseApp() {
  const [choosenState, setChoosenState] = useState(null);
  const [choosenStateTitle, setChoosenStateTitle] = useState(null);
  const [USMainMap, setUSMainMap] = useState(true);
  const [diseaseType, setDiseaseType] = useState(null);
  const [compareStates, setCompareStates] = useState(null);
  const [theme, setTheme] = useState("Dark");

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
  }, [compareStates]);

  return (
    <>
      <motion.div exit={{ y: window.innerWidth, transition: { duration: 1 } }}>
        <AppContext.Provider
          value={{
            choosenState,
            setChoosenState,
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
          }}
        >
          <TitleHeader />

          <div className="main-container" theme-value={theme}>
            {/* {USMainMap ? null : choosenState || compareStates ? (
              <DataView />
            ) : null} */}

            <DataViewLeft />

            <Map />

            <DataViewRight />

            {/* {compareStates ? <DataView /> : null}*/}
            {/* {choosenState ? null : compareStates ? null : <ColorLegend />} */}
          </div>
        </AppContext.Provider>
      </motion.div>
    </>
  );
}
