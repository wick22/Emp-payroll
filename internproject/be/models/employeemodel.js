const mongoose = require("mongoose");

const { Schema } = mongoose;
const empSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  mname: {
    type: String,
  },
  lname: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
  },
  father_name: {
    type: String,
  },
  mother_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  empid: {
    type: Number,
    require: true,
    unique: true,
  },
  hr: {
    name: { type: String },
    email: { type: String },
  },
  des: {
    type: String,
  },
  domain: {
    type: String,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  address: {
    line1: { type: String },
    line2: { type: String },
    pincode: { type: Number },
    state: { type: String },
    country: { type: String },
  },
  paddress: {
    line1: { type: String },
    line2: { type: String },
    pincode: { type: Number },
    state: { type: String },
    country: { type: String },
  },
  phone: {
    type: Number,
  },
  altphone: {
    type: Number,
  },
  class: {
    type: String,
  },
  salary: {
    type: Number,
  },
  status: {
    type: String,
  },
});

const Emp = mongoose.model("Employees", empSchema);
module.exports = Emp;
