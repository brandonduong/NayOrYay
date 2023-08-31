"use strict";

var _path = _interopRequireDefault(require("path"));
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require("dotenv").config();
var bodyParser = require("body-parser");
var cors = require("cors");
var mysql = require("mysql2");
var PORT = process.env.HTTP_PORT || 4001;
var app = (0, _express["default"])();
app.use(bodyParser.json());
app.use(cors());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "client", "build")));
app.get("/", function (req, res) {
  res.send("just gonna send it");
});
app.get("/flower", function (req, res) {
  res.json({
    name: "Dandelion",
    colour: "Blue-ish"
  });
});
var connection = mysql.createConnection({
  host: process.env.DATABASE_ENDPOINT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  port: process.env.DATABASE_PORT
});
connection.connect(function (err) {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the database!");
});
app.get("/questions", function (req, res) {
  connection.query("SELECT * FROM questions", function (error, results, fields) {
    if (error) {
      console.error("Error retrieving questions: ", error);
      res.status(500).send({
        message: "Error retrieving questions"
      });
      return;
    }
    res.send(results);
  });
});
app.listen(PORT, function () {
  console.log("Server listening at port ".concat(PORT, "."));
});
