const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createemp,
  getemp,
  updateemp,
  deleteemp,
  getall,
} = require("../controllers/post");

router.post("/create", createemp);
router.get("/emp", auth, getemp);
// router.get("/emp",getall);
router.patch("/edit", updateemp);
router.delete("/delete", deleteemp);
module.exports = router;
