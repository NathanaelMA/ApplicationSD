import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import DiseaseApp from "../pages/DiseaseApp";
import { AnimatePresence } from "framer-motion";
export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/disease" element={<DiseaseApp />} />
      </Routes>
    </AnimatePresence>
  );
}
