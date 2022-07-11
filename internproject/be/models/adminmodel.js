const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
const adminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
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
    required: true,
  },
  empid: {
    type: Number,
    required: true,
  },
  hr: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    requied: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  altphone: {
    type: Number,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

adminSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.AUTH, {
    expiresIn: "15 days",
  });
  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
};

const User = mongoose.model("Admins", adminSchema);

module.exports = User;

//login
// adminSchema.statics.findByCreads = async (email, password) => {
//   const user = await this.model.findOne({ email });
//   if (!user) {
//     throw new Error("Email or Password invalid");
//   }
//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     throw new Error("Email or Password invalid");
//   }
//   return user;
// };
