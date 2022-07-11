const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  create,
  login,
  getuser,
  createemp,
  logout,
  logoutid,
} = require("../controllers/post");
const db =
  "mongodb+srv://test:test@testing.v8gx1.mongodb.net/testing?retryWrites=true&w=majority";
mongoose
  .connect(db, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("done"))
  .catch((e) => console.log(e));

// mongoose.connect("mongodb://127.0.0.1:27017/adminusers");
router.get("/user", getuser);

router.post("/create", create);

//login
router.post("/login", login);
router.post("/logout", logout);
// router.post("/logoutone", auth, logoutid);
module.exports = router;
