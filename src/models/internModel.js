const mongoose = require("mongoose");

const internSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is Required",
    trim: true,
  },

  email: {
    type: String,
    required: "Email is Required",
    unique: true,
    trim: true,
    lowercase: true,
  },

  mobile: {
    type: String,
    required: "Mobile Number is required",
    unique: true,
  },

  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "college"
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
},{ timestamps : true });

module.exports = mongoose.model("intern", internSchema);
