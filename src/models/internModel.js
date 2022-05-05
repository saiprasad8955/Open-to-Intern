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
    validate: {
      validator: function (value) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(value);
      },
      message: "Please enter a Valid email",
      isAsync: false,
    },
  },

  mobile: {
    type: String,
    required: "Mobile Number is required",
    unique: true,
    validate:{
      validator: function (value) {
      return /^([+]\d{2}[ ])?\d{10}$/
      .test(value);
      },
      message: "Please enter 10 digit number",
      isAsync: false
    },
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
