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

app.get("/get", (req, res) => {
  const diseaseType = req.query.diseaseType;
  const choosenStateFullName = req.query.choosenState;
  db.query(
    "SELECT * FROM wondertables WHERE disease = ? and state = ?",
    [diseaseType, choosenStateFullName],
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
