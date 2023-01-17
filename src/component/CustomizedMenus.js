import { useState, useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import "./CustomizedMenus.css";
import { AppContext } from "./pages/DiseaseApp";

export default function CustomizedMenus() {
  const [dropDownName, setDropDownName] = useState("Disease Filter");
  const { setDiseaseType } = useContext(AppContext);
  function handleClick(e) {
    setDropDownName(e.target.innerHTML);
    setDiseaseType(e.target.innerHTML);
  }

  return (
    <>
      <DropdownButton id="dropdown-basic-button" title={dropDownName}>
        <Dropdown.Item
          className="dropdown-name"
          id="Action1"
          onClick={handleClick}
          href="#/action-1"
        >
          Covid
        </Dropdown.Item>
        <Dropdown.Item
          className="dropdown-name"
          id="action2"
          onClick={handleClick}
          href="#/action-2"
        >
          Influenza
        </Dropdown.Item>
        <Dropdown.Item
          className="dropdown-name"
          id="Action3"
          onClick={handleClick}
          href="#/action-3"
        >
          SARS
        </Dropdown.Item>
        <Dropdown.Item
          className="dropdown-name"
          id="Action4"
          onClick={handleClick}
          href="#/action-4"
        >
          Measles
        </Dropdown.Item>
        <Dropdown.Item
          className="dropdown-name"
          id="Action5"
          onClick={handleClick}
          href="#/action-5"
        >
          Tuberculosis
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
}
