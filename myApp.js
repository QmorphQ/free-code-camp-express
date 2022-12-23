require('dotenv').config();
let express = require("express");
let app = express();

app.use("/", (req, res, next) => {
console.log(req.method + " " + req.path + " - " + req.ip);
next();
});



app.get("/json", (req, res) => {
  process.env.MESSAGE_STYLE === "uppercase"
    ? res.json({ message: "HELLO JSON" })
    : res.json({ message: "Hello json" });
});

module.exports = app;
