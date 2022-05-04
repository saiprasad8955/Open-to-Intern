const internModel = require("../models/internModel.js");
const validator = require("validator");
const mongoose = require("mongoose");


const isValid = function (value){
    if( typeof value === 'string' && value.trim().length ===0 ) return false;
    if( typeof value === 'undefined' || value == null ) return false;
    return true;
    }

const isValidObjectId = function (value){
 return mongoose.Schema.Types.ObjectId.isValid(value)
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
    
    // Validate the name of intern
    if(!isValid(name)){
        return res.status(400).send({ status:false, message:"Please Enter the College Details" }) 
    }

    // Validate the Email ID
    if(!validator.isEmail(email)){
        return res.status(400).send({ status:false, message:"Please Enter a Valid Email" }) 
    }

    // Validate the Mobile Number
    if(!validator.isMobilePhone(mobile)){
        return res.status(400).send({ status:false, message:"Please Enter a Valid Mobile Number" }) 
    }

    // Validate the ObjectId
    if(!isValidObjectId(collegeId)){
        return res.status(400).send({ status:false, message:"Please Enter a Valid College ID" }) 
    }

    let internDetails = await internModel.create( requestBody );
    return res.status(201).send({ status : true , data : internDetails }) 

}

module.exports = {internDetails};