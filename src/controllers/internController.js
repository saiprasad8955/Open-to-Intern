const internModel = require("../models/internModel.js");
const mongoose = require("mongoose");
const collegeModel = require("../models/collegeModel.js");



const isValid = function (value){
    if( typeof value === 'string' && value.trim().length === 0 ) return false;
    if( typeof value === 'undefined' || value == null ) return false;
    return true;
    }

const isValid2 = function(value) {
    const dv = /[a-zA-Z]/;
    if(typeof value !== 'string') return false
    if(dv.test(value)=== false) return false
    return true;
    }
       

const internDetails = async function (req,res){

    // Store RequestBody data into requestBody
    const requestBody = req.body;

    // Validate the Request Body
    if( ! Object.keys(requestBody).length > 0){
        return res.status(400).send({ status:false, message:"Please Enter the College Details" })
    }

    // Object Destructing
    const { name, email, mobile, collegeName, isDeleted } = requestBody;
    
    
    // Validate the name of College
    if( ! isValid(name)){
        return res.status(400).send({ status:false, message:"Please Enter the College Details" }) 
    }

    // Check that the Name Should be String
    if( ! isValid2(name)) {
        return res.status(400).send({status: false, message: "Name is not a valid name!!!"})
    }

    // Validate the Email of intern
    if( ! isValid(email)){
        return res.status(400).send({ status:false, message:"Please Enter the Email" }) 
    }

    // Validate the Email ID
    let dv = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(! dv.test(email)){
        return res.status(400).send({ status:false, message:"Please Enter a Valid Email" }) 
    }
   
    // Validate the Email of intern
    if(! isValid(mobile) ){
        return res.status(400).send({ status:false, message:"Please Enter the Mobile Number" }) 
    }

    // Validate the Mobile Number
    if(! (/^([+]\d{2}[ ])?\d{10}$/).test(mobile)){
        return res.status(400).send({ status:false, message:"Please Enter a Valid Mobile Number" }) 
    }

    // Check College Name is Valid or not 
    if( ! isValid(collegeName) ){
         return res.status(400).send({ status:false, message:"Please Enter a College Name" })
    }

    // Checking Duplicate Entry of interns
    const duplicateEntries = await internModel.find();
     
    if ( duplicateEntries.length !== undefined && duplicateEntries.length > 0 ) {

        // Checking Duplicate Email
        const isEmailUsed = await internModel.findOne({ email: email });
        if (isEmailUsed !== null) {
            return res.status(409).send({ status: false, msg: "Email Already exists" });
        }
        
        // Checking Duplicate Mobile    
        const duplicateMobile = await internModel.findOne({ mobile: mobile })
        if (duplicateMobile !== null ) {
            return res.status(409).send({ status: false, msg: "Mobile Number already exists" });
        }
    }
    
    // isDeleted Should be False       
    if (isDeleted === true) {
        return res.status(400).send({ status: false, msg: "New entries can't be deleted" });
    }

    // Check that College Exists or not 
    let collegeData = await collegeModel.findOne( { name : collegeName } )
   
    if (! collegeData) {
        return res.status(404).send({ status: false, msg: "No College found With This Name , Check Name And Try Again" })
    }

    const collegeId = collegeData._id;

    // Finally the registration of intern is successful
    let data = {  isDeleted , name, mobile, email, collegeId }

    const internDetails = await internModel.create(data)
    return res.status(201).send({ status : true , msg:"Applied For Internship Successfully", data : internDetails }) 
}

module.exports = {internDetails};