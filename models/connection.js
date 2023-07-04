const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

mongoose.connection.on("open", ()=> {console.log("connected to mongoose");})

module.exports=mongoose