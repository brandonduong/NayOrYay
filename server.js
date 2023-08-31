import path from "path";
import express from "express";
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const PORT = process.env.HTTP_PORT || 4001;
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("/", (req, res) => {
  res.send("just gonna send it");
});
app.get("/flower", (req, res) => {
  res.json({
    name: "Dandelion",
    colour: "Blue-ish",
  });
});

const connection = mysql.createConnection({
  host: process.env.DATABASE_ENDPOINT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  port: process.env.DATABASE_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the database!");
});

app.get("/questions", (req, res) => {
  connection.query("SELECT * FROM questions", (error, results, fields) => {
    if (error) {
      console.error("Error retrieving questions: ", error);
      res.status(500).send({ message: "Error retrieving questions" });
      return;
    }
    res.send(results);
  });
});
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});
