const Users = require("../models/userModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const registerUser = asyncHandler(async (request,response) =>{
    const {name,email,password} = request.body
    if(!name || !email || !password)
    {
        response.status(400)
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await Users.findOne({email})
    console.log(userAvailable)
    if(userAvailable)
    {
        response.status(400)
        throw new Error("email address not available")
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await Users.create({
        name,
        email,
        password:hashedPassword
    })
    response.json(newUser)
})

const loginUser = asyncHandler(async (request,response) =>{
    const {email,password} = request.body
    if(!password || !email){
        response.status(400)
        throw new Error("All the fields are mandatory")
    }
    else
    {
        const user = await Users.findOne({email})
        //console.log(user)
        if(user && (await bcrypt.compare(password,user.password)))
        {
            const accessToken = jwt.sign({
            user:{
                name : user.name,
                email : user.email,
                id:user.id
            }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"15m"}
            )
            response.status(200)
            response.json({accessToken})
        }
        else{
            response.status(404)
            throw new Error("User not found")
        }
    }
})

const currentUser = asyncHandler(async (request,response) =>{
    response.json(request.user)
})

module.exports = {registerUser,loginUser,currentUser}