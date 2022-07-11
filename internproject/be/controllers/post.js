const adminModel = require("../models/adminmodel");
const empModel = require("../models/employeemodel");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const { response } = require("express");

// var authtoken;
//admin
const create = async (req, res) => {
  console.log(req.body);
  const admin = new adminModel(req.body);
  try {
    const password = await admin.password;
    const hashed = await bcrypt.hash(password, 8);
    admin.password = hashed;
    await admin.save();
    res.status(201).send(admin);
  } catch (err) {
    res.status(401).send(err.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  try {
    let user = await adminModel.findOne({ email });
    if (!user) {
      throw new Error("Email ID or Password is incorrect");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Email ID or Password is incorrect");
    }
    const token = await user.generateAuthToken();
    authtoken = token;
    console.log({ token });

    res.send({ user, token });
  } catch (err) {
    // console.log(err.message);
    res.status(400).send(err.message);
  }
};

const getuser = async (req, res) => {
  const empid = req.query.id;
  try {
    const count = await empModel.countDocuments();
    const activectr = await empModel.countDocuments({ status: "Active" });
    const cdb = await empModel.countDocuments({ domain: "CDB" });
    const cde = await empModel.countDocuments({ domain: "CDE" });
    const qea = await empModel.countDocuments({ domain: "QEA" });
    const Userobt = await adminModel.findOne({ empid });
    if (!Userobt) {
      return res.send({ err: "Not present" });
    }
    res.send({ Userobt, count, activectr, cdb, cde, qea });
  } catch (err) {
    res.send({ err: err });
  }
};
const deleteit = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await adminModel.findByIdAndDelete(id);
    if (!user) {
      return res.send("User not found");
    }
    res.send("Done");
  } catch (e) {
    res.send({ err: e });
  }
};
//logout
const logout = async (req, res) => {
  const id = req.body._id;
  console.log(id);
  try {
    const user = await adminModel.findById(id);
    console.log(user);
    user.tokens = [];
    await user.save();
    res.send(true);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const logoutid = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
  } catch (e) {
    res.status(500).send(e);
  }
};

//emp
//create
const createemp = async (req, res) => {
  const emp = new empModel(req.body);
  console.log(req.body);
  try {
    const password = await emp.password;
    emp.password = await bcrypt.hash(password, 8);
    await emp.save();
    res.status(201).send(emp);
  } catch (err) {
    res.status(401).send(err.message);
  }
};

//get
const getemp = async (req, res) => {
  const domain = req.query.domain;
  console.log("domain : ", domain);
  try {
    if (domain !== "") {
      const emps = await empModel.find({ domain });
      if (!emps) {
        console.log("Empty");
        throw new Error("No Employees present in this domain");
      }
      res.send(emps);
    } else {
      const allemp = await empModel.find({});
      res.send(allemp);
    }
  } catch (err) {
    res.send(err.message);
  }
};
//update
const updateemp = async (req, res) => {
  const emp = req.body.data;
  const id = req.body.id;
  console.log("req.body : ", req.body);
  try {
    const newemp = await empModel.findByIdAndUpdate(
      { _id: id },
      {
        fname: emp.fname,
        mname: emp.mname,
        lname: emp.lname,
        dob: emp.dob,
        father_name: emp.father_name,
        mother_name: emp.mother_name,
        email: emp.email,
        empid: emp.empid,
        hr: {
          name: emp.hr.name,
          email: emp.hr.email,
        },
        des: emp.des,
        domain: emp.domain,
        location: emp.location,
        country: emp.location,
        address: {
          line1: emp.address.line1,
          line2: emp.address.line2,
          pincode: emp.address.pincode,
          state: emp.address.state,
          country: emp.address.country,
        },
        paddress: {
          line1: emp.paddress.line1,
          line2: emp.paddress.line2,
          pincode: emp.paddress.pincode,
          state: emp.paddress.state,
          country: emp.paddress.country,
        },
        phone: emp.phone,
        altphone: emp.altphone,
        class: emp.class,
        salary: emp.salary,
        status: emp.status,
      },
      { new: true }
    );
    console.log("newemp:", newemp);
    if (!newemp) {
      console.log("Not Valid emp");
      throw new Error("Not Valid");
    }
    res.send(newemp);
  } catch (err) {
    console.log({ error: err });
    res.send(err.message);
  }
};
//delete
const deleteemp = async (req, res) => {
  const id = req.query.data;
  try {
    const user = await empModel.findByIdAndDelete({ _id: id });
    console.log("user in db : ", user);
    if (!user) {
      throw new Error("User not found");
    }
    res.send("Done");
  } catch (e) {
    res.send(e.message);
  }
};

//getall
const getall = async (req, res) => {
  try {
    const count = await empModel.countDocuments();
    console.log("count: ", count);
    res.send(count);
  } catch (err) {
    res.status.send(err.message);
  }
};

module.exports = {
  create,
  login,
  getuser,
  createemp,
  getemp,
  updateemp,
  deleteemp,
  logout,
  logoutid,
  getall,
};
