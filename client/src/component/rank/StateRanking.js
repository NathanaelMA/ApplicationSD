import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { AppContext } from "../pages/DiseaseApp";
import "./StateRanking.css";
export default function StateRanking() {
  const { diseaseType } = useContext(AppContext);
  const [states, setStates] = useState([]);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    Axios.get(
      "http://127.0.0.1:3001/getTopStates?diseaseType=" + diseaseType
    ).then((response) => {
      // console.log(response.data);
      setStates([]);
      setCases([]);
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
      <table className="table">
        <caption className="text-center font-weight-bold" id="table-caption">
          {diseaseType}
        </caption>
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
