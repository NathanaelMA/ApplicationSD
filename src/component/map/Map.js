import React, { useEffect, useContext } from "react";
import * as d3 from "d3";
import "./Map.css";
import SvgUsMap from "./UsMap";
import { AppContext } from "../pages/DiseaseApp";
import { AnimatePresence, motion } from "framer-motion";

export default function Map() {
  const {
    choosenState,
    setChoosenState,
    choosenStateTitle,
    USMainMap,
    setUSMainMap,
    compareStates,
  } = useContext(AppContext);

  useEffect(() => {
    if (choosenState && !USMainMap) {
      let width = 487,
        height = 455;

      const zoom = d3.zoom().scaleExtent([1, 3]).on("zoom", zoomed);
      d3.select(choosenState).style("fill", "red");

      const svg = d3.select("svg").attr("viewBox", [0, 0, width, height]);

      let x0 = choosenStateTitle.getBBox().x;
      let y0 = choosenStateTitle.getBBox().y;
      let x1 = choosenStateTitle.getBBox().width + x0;
      let y1 = choosenStateTitle.getBBox().height + y0;
      svg.call(zoom);

      svg
        .transition()
        .duration(200)
        .call(
          zoom.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(
              Math.min(3, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
            )
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        );

      function zoomed(event) {
        const { transform } = event;

        d3.select("g").attr("transform", transform);
        d3.select("g").attr("stroke-width", 1 / transform.k);
      }
    } else {
      setChoosenState(null);
      setUSMainMap(false);

      const svg = d3.select("svg").attr("viewBox", [-20, 3, 600, 280]);
      svg.on(".zoom", null);
      d3.select("g").attr("transform", "translate(0,0) scale(1.0)");
    }
  }, [choosenState, USMainMap, compareStates]);

  return (
    <AnimatePresence>
      {" "}
      {compareStates ? (
        <motion.div
          layout
          initial={{ width: "-20%" }}
          animate={{ width: "20%" }}
          transition={{ delay: 1 }}
          id="state-space"
        ></motion.div>
      ) : (
        <motion.div
          layout
          key="USmap"
          initial={{ x: "50%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1, transition: { duration: 1 } }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          id="map-svg"
        >
          <SvgUsMap />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
