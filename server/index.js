const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "helloWORLD019283",
  database: "sddata",
});

app.get("/getTotalNonGrowing", (req, res) => {
  const diseaseType = req.query.diseaseType;
  const choosenStateFullName = req.query.choosenState;
  const year = req.query.year;
  db.query(
    "SELECT * FROM weekly_data WHERE disease_name = ? and state = ? and year = ?",
    [diseaseType, choosenStateFullName, year],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getIncrementingTotal", (req, res) => {
  const diseaseType = req.query.diseaseType;
  const choosenStateFullName = req.query.choosenState;
  const year = req.query.year;
  db.query(
    "SELECT * FROM weekly_data WHERE disease_name = ? and state = ? and year = ?",
    [diseaseType, choosenStateFullName, year],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getCurrentWeekTotal", (req, res) => {
  const diseaseType = req.query.diseaseType;
  db.query(
    "SELECT * FROM disease_weekly_totals WHERE year = 2023 and week = 12",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getCurrentYear", (req, res) => {
  const diseaseType = req.query.diseaseType;
  db.query(
    "SELECT * FROM disease_weekly_totals WHERE year = 2023 and disease = ?",
    [diseaseType],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getYearlyTotal", (req, res) => {
  db.query("SELECT * FROM disease_yearly_totals", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getTopStates", (req, res) => {
  const diseaseType = req.query.diseaseType;
  db.query(
    "SELECT * FROM highest_weekly_data WHERE disease_name = ? and year = 2023 and week = 12",
    [diseaseType],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getMapColorCode", (req, res) => {
  const diseaseType = req.query.diseaseType;
  db.query(
    "SELECT * FROM highest_weekly_data WHERE disease_name = ? and year = 2023 and week = 12",
    [diseaseType],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// app.get("/getTotals", (req, res) => {
//   const diseaseType = req.query.diseaseType;
//   db.query(
//     "SELECT * FROM diseasetotals WHERE disease_name = ?",
//     [diseaseType],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
