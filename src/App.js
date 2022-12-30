import "./App.css";
import TitleHeader from "./component/header/TitleHeader";
import DataView from "./component/diseaseData/DataView";
import Map from "./component/map/Map";
import ColorLegend from "./component/map/ColorLegend";
import { useEffect, useState } from "react";
import DiseaseFilter from "./component/diseaseData/DiseaseFilter";

export default function App() {
  const [choosenState, setChoosenState] = useState(null);
  const [choosenStateTitle, setChoosenStateTitle] = useState(null);

  const ChoosenStatePicker = (currState) => {
    setChoosenState(currState);
  };
  useEffect(() => {
    const states = Array.from(
      document.getElementsByClassName("usMap_svg__sm_state ")
    );

    const stateTitles = Array.from(
      document.getElementsByClassName("usMap_svg__sm_label ")
    );

    states.map((state) => {
      state.addEventListener("click", function () {
        ChoosenStatePicker(state);
        stateTitles.map((stateTitle) => {
          if (stateTitle.id === state.id) {
            setChoosenStateTitle(stateTitle);
          }
        });
      });
    });

    if (choosenState) {
      states.map((state) => {
        state.removeEventListener("click", function () {
          ChoosenStatePicker(state);
        });
      });
    }
  }, [choosenState]);

  return (
    <>
      <TitleHeader />
      <div className="main-container">
        {choosenState ? <DataView /> : null}
        <Map
          choosenState={choosenState}
          choosenStateTitle={choosenStateTitle}
        />
        <DiseaseFilter />
        {choosenState ? null : <ColorLegend />}
      </div>
    </>
  );
}
