const { init } = require("../models/collegeModel.js");
const collegeModel = require("../models/collegeModel.js");
const internModel = require("../models/internModel.js");


const isValid = function (value){
    if(typeof value === 'string' && value.trim().length === 0 ) return false;
    if(typeof value === 'undefined' || value == null) return false;
    return true;
    }

const isValid2 = function(value) {
    const dv = /[a-zA-Z]/;
    if(typeof value !== 'string') return false;
    if(dv.test(value) === false) return false;
    return true;
    }
    

const collegeDetails = async function(req,res){
try{

    // Store RequestBody data into requestBody
    const requestBody = req.body;
    
    // Validate the Request Body
    if(! Object.keys(requestBody).length > 0){
        return res.status(400).send({status:false, message:"Please Enter the College Details"});
    }
    
    // Object Destructing
    const { name , fullName, logoLink, isDeleted } = requestBody;

    // Validate The Name of college
    if( ! isValid(name)){
        return res.status(400).send({status:false, message:"Please Enter College Name" })
    }

    // Check that the Name Should be String
    if( ! isValid2(name)) {
        return res.status(400).send({status: false, message: 'Name is not a Valid College Name'})
    }
           
    // Name Should be in Lowercase
    if( name !== name.toLowerCase() ) {
        return res.status(400).send({ status: false, msg: "Name should be in lowercase"})
    }

    // name must be a single word 
    if(name.split(" ").length > 1) {
        return res.status(400).send({ status: false, msg: "Please Provide the Valid Abbreviation" });
    }

    // Validate The Full Name of college
    if( ! isValid(fullName)){
         return res.status(400).send({status:false, message:"Please Enter a Full Name" })
    }

    // Check that the Name Should be String
    if( ! isValid2(fullName)) {
        return res.status(400).send({status: false, message: 'College name is not a valid name!!!'})
    }

    // Check Logolink is Coming or not 
    if( ! isValid(logoLink)) {
        return res.status(400).send({status:false, message:"Logolink is Required" })
    }

    // Validate the logoLink should be  Valid Url
    if( ! isValid2(logoLink)) {
        return res.status(400).send({status: false, message: 'LogoLink is not a valid link'})
     }

    // Validate The Logolink
    if(! (/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi).test(logoLink)){
        return res.status(400).send({status:false, message:"Please enter Valid Link" })
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
        const duplicateNames = await collegeModel.findOne({ name: name });
        if(duplicateNames !== null)  {
             return res.status(409).send({ status: false, msg: "Name is Already Exists" })
        }

         // Then Check for Full Name of Colleges
         const duplicateFullNames = await collegeModel.findOne({fullName:fullName});
         if(duplicateFullNames !== null){
             return res.status(409).send({ status: false, msg: "College Full Name is Already Exists" })
           }
    }

    // isDeleted should be false
    if (isDeleted === true) {
        return res.status(400).send({ status: false, msg: "New Entries can't be Deleted" });
    }
       
    // Then Finally Create College Details 
    const collegeDetails = await collegeModel.create( requestBody );
    return res.status(201).send({ status : true , msg:"College Successfully Created" , data : collegeDetails });
}
catch (err) {
    return res.status(500).send({ status: false, err: err.message });
}
}

// For Fetching College Details
const getCollegeDetails = async (req ,res) => {
    try{

        // Extract Query Params into a Variable
        const queryParams = req.query
        
        // Destruct CollegeName from QueryParams
        const { collegeName } = queryParams;

        // Check Query Params are coming or not
        if(! Object.keys(queryParams).length > 0){
            return res.status(400).send({status:false, message:"Invalid Filters !!!! Please Search with College Name"});
        }

        // Check College Name is coming or not
        if(! isValid( collegeName )){
            return res.status(400).send({status:false, message:"Please Enter a College Name" })
        }

        // Check College name is in Lowercase or not
        if( collegeName !== collegeName.toLowerCase()){
            return res.status(400).send({ status : false , message : "College Name Should Be in Lowercase" });
        }

        // College Name Must be a single word
        if( collegeName.split(" ").length > 1 ){
            return res.status(400).send({ status : false, message : "Please Provide the Valid Abbreviation" });
        }

        // Check if name is Invalid Name
        const college = await collegeModel.findOne({ name: collegeName }); 
       
        if(! college) {
            return res.status(404).send({ status : false , message : "College Not Found!!, Please Check With College Name" })
        }

        // If all okay then Find Interns By collegeID With college Name
        const collegeId = college._id

        const InternsInCollege = await internModel.find({ collegeId : collegeId }).select({ _id : 1, email: 1, name:1, mobile:1 })
                
        // Destructing Of Objects
        const { name, fullName, logoLink } = college;

        // Create A required response 
        // Final list of College details with students name who applied for internship
        const finalData = {
            name: name,
            fullName: fullName,
            logoLink: logoLink,
            interns : InternsInCollege.length ? InternsInCollege : {msg:"No-One is applied for Internship in this college"}
        }

        // Final Send The Response
        return res.status(200).send({ status : true , message: "College Details Fetched Successfully" , data : finalData })
    
    }catch(err){
        return res.status(500).send({ status:false, err: err.message })
    }
}

module.exports = { collegeDetails, getCollegeDetails }; 






