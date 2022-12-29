import "./App.css";
import TitleHeader from "./component/header/TitleHeader";
import DataView from "./component/diseaseData/DataView";
import Map from "./component/map/Map";

export default function App() {
  return (
    <>
      <TitleHeader />
      <div className="main-container">
        <DataView />
        <Map />
      </div>
    </>
  );
}
