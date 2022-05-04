const collegeModel = require("../models/collegeModel.js");
const validator = require("validator");


const isValid = function (value){
    if(typeof value === 'string' && value.trim().length === 0 ) return false;
    if(typeof value === 'undefined' || value == null) return false;
    if(typeof value !== 'string') return false
    return true;
    }


const collegeDetails = async function(req,res){
try{
    // Store RequestBody data into requestBody
    const requestBody = req.body;

    // Validate the Request Body
    if(! Object.keys(requestBody).length > 0) return res.status(400).send({status:false, message:"Please Enter the College Details"})
    
    // Object Destructing
    const { name , fullName, logoLink } = requestBody;

       
    // Validate The Name of college
    if(!isValid(name)) return res.status(400).send({status:false, message:"Please Enter a Valid Name" })
    
    
    // Validate The Full Name of college
    if(!isValid(fullName)) return res.status(400).send({status:false, message:"Please Enter a Full Name" })

    // // Check Logolink is Coming or not 
    // if(!logoLink) return res.status(400).send({status:false, message:"Logolink is Required" })
    
    // Validate the URL
    if(!validator.isURL(logoLink)) return res.status(400).send({status: false, message: "Please Enter a Valid Logolink" })
    
    let collegeDetails =await collegeModel.create( requestBody );
    return res.status(201).send({ status : true , data : collegeDetails });
}
catch (err) {return res.status(500).send({ status: false, err: err.message });}
  
}

module.exports= {collegeDetails};

