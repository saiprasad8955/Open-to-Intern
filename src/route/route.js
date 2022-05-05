const express = require("express")
const router = express.Router();
const collegeController = require("../controllers/collegeController.js")
const internController = require("../controllers/internController.js")


// Route For Post College Details
router.post("/functionup/colleges", collegeController.collegeDetails);


// Route For Post intern Details
router.post("/functionup/interns", internController.internDetails);


// Route For Fetching College Details With Interns Details
router.get("/functionup/collegeDetails", collegeController.getCollegeDetails);


module.exports = router;