const jwt = require("jsonwebtoken");
const User = require("../models/adminmodel");
require("dotenv").config();
const auth = async (req, res, next) => {
  try {
    let token = req.header("Auth").replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.AUTH);
    const user = await User.findOne({
      _id: decode._id,
      "tokens.token": token,
    });

    if (!user) {
      console.log("No USER");
      throw new Error("Not Authorised User");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send(e.message);
  }
};

module.exports = auth;
