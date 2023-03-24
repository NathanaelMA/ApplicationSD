const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
let diseaseType = "";
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "helloWORLD019283",
  database: "sddata",
});

app.post("/create", (req, res) => {
  diseaseType = req.body.diseaseType;
});

app.get("/get", (req, res) => {
  db.query(
    "SELECT * FROM wondertables WHERE disease = 'Measles'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
