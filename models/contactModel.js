const mongosse = require("mongoose")

const contactSchema = mongosse.Schema({
    user_id:{
        type : mongosse.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        require:[true,"please enter the name"]
    },
    email:{
        type:String,
        require:[true,"please enter the email"]
    },
    phone:{
        type:String,
        require:[true,"please enter the phone number"]
    }
},
    {
        timestamps:true
    }
)

module.exports = mongosse.model("Contact",contactSchema)