const collegeModel = require("../models/collegeModel.js");
const validator = require("validator")

const isValid = function (value){
    if(typeof value === "string" && value.trim().length ===0 ) return false;
    if(typeof value === undefined || value == null) return false;
    return true;
    }

const isValidRequestBody = function (requestBody){
    Object.keys(requestBody).length > 0
}    

const isValidURL = function(url) {
    return validator.isURL(url)
}

module.exports.collegeDetails = async function(req,res){

    //Store RequestBody data into requestBody
    const requestBody = req.body;
    
    // Object Destructing
    const {name , fullName, logoLink} = requestBody;

    // Validate the Request Body
    if(!isValidRequestBody){
        return res.status(400).send({status:false,message:"Please Enter the College Details"})
    }

    // Validate The Name of college
    if(!isValid(name)){
      return res.status(400).send({status:false,message:"Please Enter a Valid Name"})

    }

    // Validate The Full Name of college
    if(!isValid(fullName)){
      return res.status(400).send({status:false,message:"Please Enter a Full Name"})
    }

    // Validate the URL
    if(!isValidURL(logoLink)) {
        return res.status(400).send({status: false, message: 'LogoLink is required!!!'})
    }

    let collegeDetails =await collegeModel.create( data );
    return res.status(200).send({ status : true , data : collegeDetails }) 
}

