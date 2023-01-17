import "./DiseaseApp.css";
import React from "react";
import TitleHeader from "../header/TitleHeader";
import DataViewLeft from "../diseaseData/DataViewLeft";
import DataViewRight from "../diseaseData/DataViewRight";
import Map from "../map/Map";
import ColorLegend from "../map/ColorLegend";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import * as d3 from "d3";
import Folder from "../../InfectiousDiseaseDataSets-main/Diseases2022Data/CovidData/month01.csv";

export const AppContext = React.createContext();

const statesNameCoding = [
  ["Alabama", "AL"],
  ["Alaska", "AK"],
  ["American Samoa", "AS"],
  ["Arizona", "AZ"],
  ["Arkansas", "AR"],
  ["Armed Forces Americas", "AA"],
  ["Armed Forces Europe", "AE"],
  ["Armed Forces Pacific", "AP"],
  ["California", "CA"],
  ["Colorado", "CO"],
  ["Connecticut", "CT"],
  ["Delaware", "DE"],
  ["District Of Columbia", "DC"],
  ["Florida", "FL"],
  ["Georgia", "GA"],
  ["Guam", "GU"],
  ["Hawaii", "HI"],
  ["Idaho", "ID"],
  ["Illinois", "IL"],
  ["Indiana", "IN"],
  ["Iowa", "IA"],
  ["Kansas", "KS"],
  ["Kentucky", "KY"],
  ["Louisiana", "LA"],
  ["Maine", "ME"],
  ["Marshall Islands", "MH"],
  ["Maryland", "MD"],
  ["Massachusetts", "MA"],
  ["Michigan", "MI"],
  ["Minnesota", "MN"],
  ["Mississippi", "MS"],
  ["Missouri", "MO"],
  ["Montana", "MT"],
  ["Nebraska", "NE"],
  ["Nevada", "NV"],
  ["New Hampshire", "NH"],
  ["New Jersey", "NJ"],
  ["New Mexico", "NM"],
  ["New York", "NY"],
  ["North Carolina", "NC"],
  ["North Dakota", "ND"],
  ["Northern Mariana Islands", "NP"],
  ["Ohio", "OH"],
  ["Oklahoma", "OK"],
  ["Oregon", "OR"],
  ["Pennsylvania", "PA"],
  ["Puerto Rico", "PR"],
  ["Rhode Island", "RI"],
  ["South Carolina", "SC"],
  ["South Dakota", "SD"],
  ["Tennessee", "TN"],
  ["Texas", "TX"],
  ["US Virgin Islands", "VI"],
  ["Utah", "UT"],
  ["Vermont", "VT"],
  ["Virginia", "VA"],
  ["Washington", "WA"],
  ["West Virginia", "WV"],
  ["Wisconsin", "WI"],
  ["Wyoming", "WY"],
];

export default function DiseaseApp() {
  const [choosenState, setChoosenState] = useState(null);
  const [choosenStateTitle, setChoosenStateTitle] = useState(null);
  const [USMainMap, setUSMainMap] = useState(true);
  const [diseaseType, setDiseaseType] = useState(null);
  const [compareStates, setCompareStates] = useState(null);
  const [theme, setTheme] = useState("Dark");
  const [CSVData, setCSVData] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [CSVStatesData, setCSVStatesData] = useState(null);
  const [rightStateSelector, setRightStateSelector] = useState("Texas");

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
    setStateData(states);

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

  // const parseDate = d3.timeParse("%m/%d/%y");

  useEffect(() => {
    const row = (d) => {
      const getAbbreviation = statesNameCoding.filter((stateArr) => {
        if (stateArr[0] === d.state) return stateArr[1];
      });

      d.deaths = +d.deaths;
      getAbbreviation.length > 0
        ? (d.abbreviation = getAbbreviation[0][1])
        : (d.abbreviation = "");

      return d;
    };

    d3.csv(Folder, row).then((data) => {
      setCSVData(data);
      console.log("here");
    });
  }, []);

  //loop through states_and_titles and add red color to every state and title
  useMemo(() => {
    if (CSVData) {
      const lastestDeathToll = CSVData.filter(
        (data) => data.date === "2022-01-31"
      );
      const sortedLastestDeathToll = lastestDeathToll.sort(
        (a, b) => a.deaths - b.deaths
      );
      //setCSVStatesData(sortedLastestDeathToll);

      const selectedState = CSVData.filter(
        (data) => data.state === rightStateSelector
      );

      const sortedSelectState = selectedState.sort(
        (a, b) => a.deaths - b.deaths
      );

      console.log(sortedSelectState);
      setCSVStatesData(sortedSelectState);
      stateData.map((svgState) => {
        const foundState = sortedLastestDeathToll.find(
          (csvState) => csvState.abbreviation === svgState.id
        );

        if (foundState) {
          svgState.style.fill =
            foundState.deaths >= 0 && foundState.deaths <= 26755
              ? "#FFFF8F"
              : foundState.deaths >= 26756 && foundState.deaths <= 53510
              ? "orange"
              : foundState.deaths >= 53511
              ? "red"
              : "orange";
        }
      });
    }
  }, [CSVData, rightStateSelector, USMainMap]);

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
            CSVData,
            CSVStatesData,
            setCSVStatesData,
            rightStateSelector,
            setRightStateSelector,
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
