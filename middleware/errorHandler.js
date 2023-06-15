const {constants} = require("../constants")
const errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode ? res.statusCode : 500
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({"title":"Validation Failed",message:err.message})
            break;
        case constants.NOT_FOUND:
            res.json({"title":"Not Found",message:err.message})
            break;
        case constants.FORBIDDEN:
            res.json({"title":"Access Forbidden",message:err.message})
            break;
        case constants.UNAUTHORIZED:
            res.json({"title":"Unauthorized Access",message:err.message})
            break;
        case constants.SERVER_ERROR:
            res.json({"title":"Server Error",message:err.message})
            break;
        default:
            console.log("No issues found")
    }
    
    
}

module.exports = errorHandler