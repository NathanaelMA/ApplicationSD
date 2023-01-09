import React from "react";
import Home from "./component/pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DiseaseApp from "./component/pages/DiseaseApp";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/disease" element={<DiseaseApp />} />
        </Routes>
      </Router>
    </>
  );
}
