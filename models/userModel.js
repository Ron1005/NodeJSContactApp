const mongoose = require("mongoose")

const userSchema  = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter the name"]
    },
    email:{
        type:String,
        required:[true,"please enter the email"],
        unique:[true,"Email address already taken"]
    },
    password:{
        type:String,
        required:[true,"please enter the password"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema)