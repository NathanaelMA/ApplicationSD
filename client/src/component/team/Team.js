import React, { useEffect } from "react";
import "./Team.css";
import NMAImg from "../../images/NMA.jpg";
import CVEImg from "../../images/CVE.jpg";
import SSCImg from "../../images/SSC.png";
import Art1 from "../../images/art1.jpeg";
import ZRImg from "../../images/ZR.png";
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

export default function Team() {
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
      <div className="container" id="home-page">
        <div className="col-md section-title">
          <h2>Our Team</h2>
        </div>
        <div id="inFocusBio">
          <div id="inFocusBioInfo">
            <h2>{bioName}</h2>
            {/* <p>{bioInfo}</p> */}
          </div>
          <img src={focusedPerson.pic} alt=""></img>
        </div>
        <div id="teamImages" className="text-center">
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
      <div className="container" id="dev-tools-container">
        <div className="text-center section-title">
          <h2>Dev Tools</h2>
        </div>
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
      <div className="container">
        <p id="credits">
          For more information on the data used on this webpage, please visit
          the <a href="https://www.who.int/"> WHO </a> and
          <a href="https://covid.cdc.gov/covid-data-tracker/#datatracker-home">
            CDC
          </a>
          websites
        </p>
      </div>
    </>
  );
}
