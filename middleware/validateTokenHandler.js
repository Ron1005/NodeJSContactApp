const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const validateToken = asyncHandler( async (req,res,next)=>{
    console.log("Inside")
    let token;
   let  authHeader = req.headers.authorization || req.headers.authorization
   if(authHeader && authHeader.startsWith("Bearer")){
    token = authHeader.split(" ")[1]
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err){
            res.status(401)
            throw new Error("You are not authorized to access")
        }
        else
        {
            req.user = decoded.user
            console.log(decoded.user)
            //console.log(req)
            next();
        }
    })
   }
   else
   {
    res.status(401)
    throw new Error("Invalid Token")
   }

})

module.exports = validateToken