const jwt = require("jsonwebtoken");

require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  //get user from jwd token and add id to req object
  const token = req.header("auth-token");

  if (!token) {
    console.log("Please try using valid token");
    res.status(401).send({ error: "Please try using valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please try using valid token2" });
  }
};

module.exports = fetchuser;
