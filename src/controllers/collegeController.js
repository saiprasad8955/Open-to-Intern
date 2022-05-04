const collegeModel = require("../models/collegeModel.js");


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
    const { name , fullName, logoLink, isDeleted } = requestBody;

       
    // Validate The Name of college
    if(!isValid(name)) {
        return res.status(400).send({status:false, message:"Please Enter a Valid College Name" })
    }
        
    // Name Should be in Lowercase
    if(!isValidName(name)) {
        return res.status(400).send({ status: false, msg: "Name should be in  lowercase"})
    }

    // name must be a single word
    if(name.split(" ").length > 1) {
        return res.status(400).send({ status: false, msg: "Please provide the Valid Abbreviation" });
    }

    // Validate The Full Name of college
    if(!isValid(fullName)){
         return res.status(400).send({status:false, message:"Please Enter a Full Name" })
    }

    // Check Logolink is Coming or not 
    if(!isValid(logoLink)) {
        return res.status(400).send({status:false, message:"Logolink is Required" })
    }
    
    // Validate The Logolink
    if(! (/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi).test(logoLink)){
        return res.status(400).send({status:false, message:"Please enter Valid Link" })
    }
    
    // isDeleted should be false
    if (isDeleted === true) {
        return res.status(400).send({ status: false, msg: "New Entries can't be Deleted" });
    }

    // Duplicate Logo Link
    const duplicateLogo = await collegeModel.findOne({ logoLink: logoLink })
    if (duplicateLogo) {
        return res.status(409).send({ status: false, msg: 'The logo link which you have entered belongs to some other college' })
    }
    
    // Duplicate Entries Should Not be Added
    let duplicate = await collegeModel.find();
    if(duplicate.length !== 0){

        // First Check for Name of Colleges
        const duplicateNames = await collegeModel.find({name:name});
        if(!duplicateNames)  {
             return res.status(409).send({ status: false, msg: "College Name is Already Exists" })
        }

         // Then Check for Name of Colleges
         const duplicateFullNames = await collegeModel.find({fullName:fullName});
         if(!duplicateFullNames){
             return res.status(409).send({ status: false, msg: "College Name is Already Exists" })
            }
    }
    
    

    // Then Finally Create College Details 
    let collegeDetails =await collegeModel.create( requestBody );
    return res.status(201).send({ status : true , data : collegeDetails });
}
catch (err) {
    return res.status(500).send({ status: false, err: err.message });}
}

module.exports= {collegeDetails};