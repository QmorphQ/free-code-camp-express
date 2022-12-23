require("dotenv").config();
let express = require("express");
let bodyParser = require('body-parser');
let app = express();

app.use("/", (req, res, next) => {
  console.log(req.params);
  console.log(req.method + " " + req.path + " - " + req.ip + " " + req.time);
  next();
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  process.env.MESSAGE_STYLE === "uppercase"
    ? res.json({ message: "HELLO JSON" })
    : res.json({ message: "Hello json" });
});
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.use("/name", bodyParser.urlencoded({extended: false}));

app.route("/name").get((req, res) => {
    res.json({name: req.query.first + " " + req.query.last}); 
})

module.exports = app;
