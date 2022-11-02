const express = require("express");
const bodyParser = require("body-parser");
const connectToMongo = require("./db");
let cors = require("cors");

require("dotenv").config();
const app = express();
const port = 5000;

connectToMongo();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// routes
app.use("/api/user", require("./Routes/user"));
app.use("/api/goal", require("./Routes/goal"));

app.get("/", (req, res) => {
  res.send("Hello Tanmay !");
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
