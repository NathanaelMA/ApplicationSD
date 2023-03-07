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
  const [person1, setPerson1] = React.useState({
    pic: Art1,
    name: "blue and purple and orange art",
  });
  const [person2, setPerson2] = React.useState({
    pic: Art2,
    name: "blue and pink art",
  });
  const [person3, setPerson3] = React.useState({
    pic: Art3,
    name: "art museum",
  });
  const [person4, setPerson4] = React.useState({
    pic: Art4,
    name: "tree",
  });
  const [focusedPerson, setFocusedPerson] = React.useState({
    pic: logo,
    name: "pic of scale",
  });
  const [bioInfo, setBioInfo] = React.useState("");
  const [bioName, setBioName] = React.useState(focusedPerson.name);

  useEffect(() => {
    fetch(Me).then((response) => {
      response.text().then((text) => {
        setBioInfo(text);
      });
    });
  }, [focusedPerson]);

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
          <img src={focusedPerson.pic}></img>
        </div>
        <div id="teamImages">
          <div>
            <img
              src={person1.pic}
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
              onClick={() => {
                setFocusedPerson(person4);
                setPerson4(focusedPerson);
                setBioName(person4.name);
              }}
            ></img>
            <h3> {person4.name}</h3>
          </div>
        </div>
      </motion.div>
    </>
  );
}
