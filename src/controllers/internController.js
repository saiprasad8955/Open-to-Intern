const internModel = require("../models/internModel.js");
const validator = require("validator");

const isValidRequestBody = function(value){
    if(value === undefined || value === null) return false;
    if(value ==="string" && value.trim().length ===0) return false;
    return true;
}