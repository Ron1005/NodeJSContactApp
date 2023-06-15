console.log("Testing npm")

const express = require("express")
const dotenv = require("dotenv").config()
const errorHandler = require("./middleware/errorHandler")
const dbConnect = require("../mycontacts-backend/config/dbConnection")

const app = express();

dbConnect();

console.log("nodemon activated")
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use("/api/contacts",require("./routes/contactRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log("App is listening")
})
