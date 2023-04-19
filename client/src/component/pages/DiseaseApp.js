import "./DiseaseApp.css";
import React from "react";
import TitleHeader from "../header/TitleHeader";
import ComparisonLeft from "../diseaseData/ComparisonLeft";
import ComparisonRight from "../diseaseData/ComparisonRight";
import Map from "../map/Map";
import ColorLegend from "../map/ColorLegend";
import { useEffect, useState } from "react";
import Rank from "../rank/Nation";
import ChoosenStateView from "../diseaseData/ChoosenStateView";
import Team from "../team/Team";
import Nation from "../rank/Nation";
import Prediction from "../predictions/Prediction";
import Axios from "axios";
import * as d3 from "d3";

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
  const [statesData, setStatesData] = useState([]);
  const [highestDiseaseCase, setHighestDiseaseCase] = useState(0);
  const [changeMapColor, setChangeMapColor] = useState(true);

  //test

  const statesAbbre = [
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["Arizona", "AZ"],
    ["Arkansas", "AR"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
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
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"],
  ];

  useEffect(() => {
    // setDeaths([]);
    // setCases([]);
    // setDate([]);

    Axios.get(
      "http://localhost:3001/getMapColorCode?diseaseType=" + diseaseType
    ).then((response) => {
      response.data.sort((a, b) => b.disease_cases - a.disease_cases);
      console.log(response.data);
      for (let j = 0; j < response.data.length; j++) {
        const stateData = response.data[j];
        stateData.state = statesAbbre.find(
          (pair) => pair[0] === stateData.state
        )
          ? statesAbbre.find((pair) => pair[0] === stateData.state)[1]
          : null;
        setStatesData((prevData) => [...prevData, stateData]);
        setHighestDiseaseCase(response.data[0].disease_cases);
        // setStatesData((prevData) => [...prevData, response.data[j]]);
        // setDate((prevData) => [...prevData, response.data[j].week + " "]);
        // diseaseType === "Covid"
        //   ? setDeaths((prevData) => [
        //       ...prevData,
        //       response.data[j].disease_deaths + " ",
        //     ])
        //   : setDeaths([]);
        // setCases((prevData) => [
        //   ...prevData,
        //   response.data[j].disease_cases + " ",
        // ]);
      }
    });
  }, [diseaseType]);

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

    //changing state colors

    if (changeMapColor) {
      statesData.map((stateData) => {
        const state = states.find(
          (stateElem) => stateElem.id === stateData.state
        );

        stateData.disease_cases < highestDiseaseCase / 3
          ? d3.select(state).style("fill", "#A3B9CC")
          : stateData.disease_cases < (highestDiseaseCase / 3) * 2
          ? d3.select(state).style("fill", "#88A4BC")
          : d3.select(state).style("fill", "#6D8FAA");
      });
    }
    //end test

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
  }, [changeMapColor, highestDiseaseCase]);

  useEffect(() => {
    choosenState ? setStackedDisplay(true) : setStackedDisplay(false);
    choosenState ? setChangeMapColor(false) : setChangeMapColor(true);
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
        changeMapColor,
        setChangeMapColor,
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
