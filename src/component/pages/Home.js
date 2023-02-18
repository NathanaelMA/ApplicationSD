import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { motion } from "framer-motion";
import logo from "../../images/scale.png";
import Art1 from "../../images/art1.jpeg";
import Art2 from "../../images/art2.jpeg";
import Art3 from "../../images/art3.jpeg";
import Art4 from "../../images/art4.jpeg";
import Me from "../../images/me.txt";

export default function Home() {
  const [pic1, setPic1] = React.useState({
    pic: Art1,
    name: "blue and purple and orange art",
  });
  const [pic2, setPic2] = React.useState({
    pic: Art2,
    name: "blue and pink art",
  });
  const [pic3, setPic3] = React.useState({
    pic: Art3,
    name: "art museum",
  });
  const [pic4, setPic4] = React.useState({
    pic: Art4,
    name: "tree",
  });
  const [mainPic, setMainPic] = React.useState({
    pic: logo,
    name: "pic of scale",
  });
  const [bioInfo, setBioInfo] = React.useState("");
  const [bioName, setBioName] = React.useState(mainPic.name);

  useEffect(() => {
    fetch(Me).then((response) => {
      response.text().then((text) => {
        setBioInfo(text);
      });
    });
  }, [mainPic]);

  return (
    <>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%", opacity: 1, transition: { duration: 1.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.7 } }}
        id="homePage"
      >
        <h1>
          <Link to={"/disease"}> Disease Page</Link>
        </h1>
        <h2>Our Team</h2>
        <div id="inFocusBio">
          <div id="inFocusBioInfo">
            <h2>{bioName}</h2>
            <p>{bioInfo}</p>
          </div>
          <img src={mainPic.pic}></img>
        </div>
        <div id="teamImages">
          <div>
            <img
              src={pic1.pic}
              onClick={() => {
                setMainPic(pic1);
                setPic1(mainPic);
                setBioName(pic1.name);
              }}
            ></img>
            <h3>{pic1.name}</h3>
          </div>
          <div>
            <img
              src={pic2.pic}
              onClick={() => {
                setMainPic(pic2);
                setPic2(mainPic);
                setBioName(pic2.name);
                setBioInfo();
              }}
            ></img>
            <h3>{pic2.name}</h3>
          </div>
          <div>
            <img
              src={pic3.pic}
              onClick={() => {
                setMainPic(pic3);
                setPic3(mainPic);
                setBioName(pic3.name);
              }}
            ></img>
            <h3> {pic3.name} </h3>
          </div>
          <div>
            <img
              src={pic4.pic}
              onClick={() => {
                setMainPic(pic4);
                setPic4(mainPic);
                setBioName(pic4.name);
              }}
            ></img>
            <h3> {pic4.name}</h3>
          </div>
        </div>
      </motion.div>
    </>
  );
}
