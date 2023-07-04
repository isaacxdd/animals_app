require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const animalRoutes = require("./controllers/animalrouters.js")
const methodOverride = require('method-override');
const app = express()


//middleware
app.use(morgan("dev"))
app.use(express.urlencoded({extended:false}))// allows the req.body to be read from the form
app.use(methodOverride("_method"))
app.use(express.static("public"))

//Routes
app.use("/animal", animalRoutes)


app.listen(process.env.PORT, ()=>{
    console.log(` PORT ${process.env.PORT} is Running`);
})