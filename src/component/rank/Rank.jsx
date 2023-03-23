import React, { useContext } from "react";
import "./Rank.css";
import { motion } from "framer-motion";
import { AppContext } from "../pages/DiseaseApp";

export default function Rank() {
  const { rankingPage, setRankingPage } = useContext(AppContext);
  return (
    rankingPage && (
      //   <motion.div
      //     layout
      //     initial={{ opacity: 0 }}
      //     animate={{ opacity: 1, transition: { duration: 3 } }}
      //     exit={{ opacity: 0 }}
      //   >
      //     Rank
      //   </motion.div>
      <>rank</>
    )
  );
}
