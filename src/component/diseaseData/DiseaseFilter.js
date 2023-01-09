import React, { useContext } from "react";
import "./DiseaseFilter.css";
import { AppContext } from "../pages/DiseaseApp";

export default function DiseaseFilter() {
  const { theme } = useContext(AppContext);
  return (
    <div id="disease-container" themeValue={theme}>
      Disease Filter
      <p></p>
    </div>
  );
}
