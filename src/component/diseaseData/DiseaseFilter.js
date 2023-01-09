import React, { useContext } from "react";
import "./DiseaseFilter.css";
import { AppContext } from "../pages/DiseaseApp";

export default function DiseaseFilter() {
  const {} = useContext(AppContext);
  return (
    <div id="disease-container">
      Disease Filter
      <p></p>
    </div>
  );
}
