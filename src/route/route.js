const express = require("express")
const router = express.Router();
const collegeController = require("../controllers/collegeController.js")
const internController = require("../controllers/internController.js")


// Route For Post College Details
router.post("/functionup/colleges",collegeController.collegeDetails);


// Route For Post intern Details
router.post("/functionup/interns",internController.internDetails);


// Route For intern Details
// router.post("functionup/colleges",internController.internDetails);


module.exports = router;