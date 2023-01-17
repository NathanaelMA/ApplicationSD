import React, { useContext } from "react";
import "./DiseaseFilter.css";
import { AppContext } from "../pages/DiseaseApp";
import Folder from "../../../InfectiousDiseaseDataSets-main/Diseases2022Data/CovidData/month01.csv";

export default function DiseaseFilter() {
  const { theme } = useContext(AppContext);
  console.log(Folder);
  return (
    <div id="disease-container" theme-value={theme}>
      Disease Filter
      <p></p>
    </div>
  );
}
