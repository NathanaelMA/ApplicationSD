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
      <footer className="footer-distributed">
        <div className="footer-right">
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fa fa-github"></i>
          </a>
        </div>

        <div className="footer-left">
          <p className="footer-links">
            <a className="link-1" href="#">
              Home
            </a>
            <a href="#">Team</a>
            <a href="#">Contact</a>
            <a href="#">About</a>
          </p>

          <p>
            Cleveland State University &copy; 2023
            <br></br>
            For more information on the data used on this webpage, please visit
            the <a href="https://www.who.int/"> WHO </a> and{" "}
            <a href="https://covid.cdc.gov/covid-data-tracker/#datatracker-home">
              CDC
            </a>{" "}
            websites.
          </p>
        </div>
      </footer>
    </>
  );
}
