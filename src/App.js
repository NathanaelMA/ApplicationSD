import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./component/Routes/AnimatedRoutes";

export default function App() {
  return (
    <>
      <Router>
        <AnimatedRoutes />
      </Router>
    </>
  );
}
