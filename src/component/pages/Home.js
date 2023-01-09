import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <Link to={"/disease"}> Disease Page</Link>
    </>
  );
}
