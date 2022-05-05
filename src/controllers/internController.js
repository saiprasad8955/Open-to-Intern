const internModel = require("../models/internModel.js");
const validator = require("validator");
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
        return true
        }
        

const isValidObjectId = function (value){
 return mongoose.Types.ObjectId.isValid(value)
}


const internDetails= async function (req,res){

    // Store RequestBody data into requestBody
    const requestBody = req.body;

    // Validate the Request Body
    if( !Object.keys(requestBody).length > 0){
        return res.status(400).send({ status:false, message:"Please Enter the College Details" })
    }

    // Object Destructing
    const { name, email, mobile, collegeId } = requestBody;
    
    // Validate the name of College
    if(!isValid(name)){
        return res.status(400).send({ status:false, message:"Please Enter the College Details" }) 
    }

    // Check that the Name Should be String
    if(!isValid2(name)) {
        return res.status(400).send({status: false, message: "Name is not a valid name!!!"})
    }

    // // Name Should be in Lowercase
    // if(name !== name.toLowerCase()) {
    //     return res.status(400).send({ status: false, msg: "Name should be in  lowercase"})
    // }

    // Validate the Email of intern
    if(!isValid(email)){
        return res.status(400).send({ status:false, message:"Please Enter the Email" }) 
    }

    // Validate the Email ID
    if(!validator.isEmail(email)){
        return res.status(400).send({ status:false, message:"Please Enter a Valid Email" }) 
    }
   
    // Validate the Email of intern
    if(! isValid(mobile)){
        return res.status(400).send({ status:false, message:"Please Enter the Mobile Number" }) 
    }

    // Validate the Mobile Number
    if(! (/^([+]\d{2}[ ])?\d{10}$/).test(mobile)){
        return res.status(400).send({ status:false, message:"Please Enter a Valid Mobile Number" }) 
    }

    // Check College Id is Valid or not 
    if(! collegeId){
         return res.status(400).send({ status:false, message:"Please Enter a College Name" })
    }

    // Validate the ObjectId
    if(!isValidObjectId(collegeId)){
        return res.status(400).send({ status:false, message:"Please Enter a Valid College ID" }) 
    }

    // Check if Wrong College Id Come then data exists or not
    const wrongClg = await collegeModel.findById(collegeName)
    if(!wrongClg){
        return res.status(400).send( { status: false , message: 'College Does Not Exist With this CollegeId'})
    }

    // Checking Duplicate Entry of interns
    const duplicateEntries = await internModel.find();
     
    if ( duplicateEntries.length !== undefined && duplicateEntries.length > 0 ) {

        // Checking Duplicate Email
        const isEmailUsed = await internModel.findOne({ email: email });
        if (isEmailUsed.length !== null) {
            return res.status(409).send({ status: false, msg: "Email already exists" });
        }
        
        // Checking Duplicate Mobile    
        const duplicateMobile = await internModel.findOne({ mobile: mobile })
        if (duplicateMobile) {
            return res.status(409).send({ status: false, msg: "Mobile Number already exists" });
        }
    }

    // isDeleted Should be False       
    if (isDeleted === true) {
        return res.status(400).send({ status: false, msg: "New entries can't be deleted" });
    }

    const internDetails = await internModel.create( requestBody );
    return res.status(201).send({ status : true , msg:"Applied For Internship Successfully",data : internDetails }) 
}

module.exports = {internDetails};