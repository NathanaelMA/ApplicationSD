import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { AppContext } from "../pages/DiseaseApp";
export default function StateRanking() {
  const {
    rankingPage,
    choosenState,
    setChoosenState,
    diseaseType,
    compareStates,
    theme,
  } = useContext(AppContext);
  const [dropDownState, setDropDownState] = useState(null);
  const [date, setDate] = useState([]);
  const [states, setStates] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [cases, setCases] = useState([]);
  const [scroll, setScroll] = useState("true");

  useEffect(() => {
    setStates([]);
    setCases([]);

    Axios.get(
      "http://127.0.0.1:3001/getTopStates?diseaseType=" + diseaseType
    ).then((response) => {
      // console.log(response.data);

      for (let j = 0; j < response.data.length; j++) {
        setStates((prevData) => [...prevData, response.data[j].state + " "]);
        setCases((prevData) => [
          ...prevData,
          response.data[j].total_cases + " ",
        ]);
      }
    });
  }, [diseaseType]);

  return (
    <>
      {/* <div>
        <h1>{diseaseType} </h1>
        {states.map((state, index) => {
          return (
            <div key={index}>
              <p>{state}</p>
              <p>{cases[index]}</p>
            </div>
          );
        })}
      </div> */}

      <table className="table">
        <caption> {diseaseType}</caption>
        <thead>
          <tr>
            <th scope="col">Current Rank</th>
            <th scope="col">State</th>
            <th scope="col">Cases</th>
          </tr>
        </thead>
        <tbody>
          {states.map((state, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{state}</td>
                <td>{cases[index]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
