const mongoose = require("mongoose");
const validator = require("validator");

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
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      msg: "Please enter a valid email",
      isAsync: false,
    },
  },

  mobile: {
    type: Number,
    required: "Mobile Number is required",
    unique: true,
    validate:{
      validator: function (value) {
      return /^\d{10}$/.test(value);
      },
      msg: "Please enter 10 digit number",
      isAsync: false
    },
  },

  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "college",
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
},{ timestamps : true });

module.exports = mongoose.model("intern", internSchema);
