import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { motion } from "framer-motion";
import NMAImg from "../../images/NMA.jpg";
import CVEImg from "../../images/CVE.jpg";
import SSCImg from "../../images/SSC.png";
import Art1 from "../../images/art1.jpeg";
import ZRImg from "../../images/ZR.jpg";
import Art2 from "../../images/art2.jpeg";
import Nate from "../../Bio/Nate.txt";
import Zavier from "../../Bio/Zavier.txt";
import Connor from "../../Bio/Connor.txt";
import Danny from "../../Bio/Danny.txt";
import Sun from "../../Bio/Sun.txt";
import CSSImg from "../../images/css.png";
import ReactImg from "../../images/react.png";
import PythonImg from "../../images/python.png";
import AzureImg from "../../images/azure.png";
import ChartJSImg from "../../images/chartJS.png";
import D3Img from "../../images/d3.png";
import MysqlImg from "../../images/mysql.png";
import PytorchImg from "../../images/pytorch.png";
import NodeJSImg from "../../images/nodeJS.png";

export default function Home() {
  const [person1, setPerson1] = React.useState({
    pic: ZRImg,
    name: "Zavier Romano",
    bio: Zavier,
  });
  const [person2, setPerson2] = React.useState({
    pic: Art2,
    name: "Danny DeJesus",
    bio: Danny,
  });
  const [person3, setPerson3] = React.useState({
    pic: CVEImg,
    name: "Connor Van Etten",
    bio: Connor,
  });
  const [person4, setPerson4] = React.useState({
    pic: NMAImg,
    name: "Nathanael Ahiagbedey",
    bio: Nate,
  });
  const [focusedPerson, setFocusedPerson] = React.useState({
    pic: SSCImg,
    name: "Dr. Sunnie Sun Chung",
    bio: Sun,
  });
  const [bioInfo, setBioInfo] = React.useState("");
  const [bioName, setBioName] = React.useState(focusedPerson.name);

  useEffect(() => {
    fetch(focusedPerson.bio).then((response) => {
      response.text().then((text) => {
        setBioInfo(text);
      });
    });
  }, [focusedPerson]);

  return (
    <>
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "0%", opacity: 1, transition: { duration: 1.5 } }}
      >
        <h1 id="title">
          <Link id="link" to={"/disease"}>
            Infectious Disease Risk Predictor
          </Link>
        </h1>
        <div id="ms-container">
          <h2 id="ms-header">Mission Statement</h2>
          <p id="mission-statement">
            {" "}
            This project aims to create a credible infectious disease predictor
            that can provide integrated information on a few dangerous
            infectious diseases with prediction of its trend and risk level. The
            system will provide both visualization of consolidated information
            of any infectious disease and the correctly sourced information that
            will be retrieved from multiple verified sources including the CDC
            and WHO. This project will explore a number of relevant subjects
            within computer science. This includes big data processing
            techniques to transform the collected big data, database knowledge
            to design, create and maintain databases as a backend to store the
            processed information and intermediate results to retrieve our
            current summarized data for visualization. Lastly, it includes
            semi-supervised learning from the processed data with machine
            learning algorithms which allows our system to produce an up to date
            prediction of trends and risk level of the user given disease.
          </p>
          <div className="custom-shape-divider-bottom-1679614101">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </div>
        <div id="home-page">
          <h2 id="our-team">Our Team</h2>
          <div id="inFocusBio">
            <div id="inFocusBioInfo">
              <h2>{bioName}</h2>
              <p>{bioInfo}</p>
            </div>
            <img src={focusedPerson.pic} alt=""></img>
          </div>
          <div id="teamImages">
            <div>
              <img
                src={person1.pic}
                alt=""
                onClick={() => {
                  setFocusedPerson(person1);
                  setPerson1(focusedPerson);
                  setBioName(person1.name);
                }}
              ></img>
              <h3>{person1.name}</h3>
            </div>
            <div>
              <img
                src={person2.pic}
                alt=""
                onClick={() => {
                  setFocusedPerson(person2);
                  setPerson2(focusedPerson);
                  setBioName(person2.name);
                  setBioInfo();
                }}
              ></img>
              <h3>{person2.name}</h3>
            </div>
            <div>
              <img
                src={person3.pic}
                alt=""
                onClick={() => {
                  setFocusedPerson(person3);
                  setPerson3(focusedPerson);
                  setBioName(person3.name);
                }}
              ></img>
              <h3> {person3.name} </h3>
            </div>
            <div>
              <img
                src={person4.pic}
                alt=""
                onClick={() => {
                  setFocusedPerson(person4);
                  setPerson4(focusedPerson);
                  setBioName(person4.name);
                }}
              ></img>
              <h3> {person4.name}</h3>
            </div>
          </div>
        </div>
        <div id="dev-tools-container">
          <h2 id="dev-tools-title">Dev Tools</h2>
          {/* <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg> */}
          <div id="client">
            <img src={ReactImg} alt=""></img>
            <img src={CSSImg} alt=""></img>
            <img src={D3Img} alt=""></img>
            <img src={ChartJSImg} alt=""></img>
          </div>
          <div id="server">
            <img src={NodeJSImg} alt=""></img>
            <img src={PythonImg} alt=""></img>
            <img src={PytorchImg} alt=""></img>
          </div>
          <div id="database-cloud">
            <img src={MysqlImg} alt=""></img>
            <img src={AzureImg} alt=""></img>
          </div>
        </div>
        <p id="credits">
          For more information on the data used on this webpage, please visit
          the <a href="https://www.who.int/"> WHO </a> and
          <a href="https://covid.cdc.gov/covid-data-tracker/#datatracker-home">
            CDC
          </a>
          websites
        </p>
      </motion.div>
    </>
  );
}
