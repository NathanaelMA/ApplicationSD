import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { motion } from "framer-motion";
import logo from "../../images/scale.png";
export default function Home() {
  return (
    <>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%", opacity: 1, transition: { duration: 1.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.7 } }}
      >
        <Link to={"/disease"}> Disease Page</Link>
        <h1>Home Page</h1>

        <img src={logo}></img>
      </motion.div>
    </>
  );
}
