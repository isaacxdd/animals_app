const mongoose = require("./connection.js")
const animalData = require("./seedData.js")
const dataModel = require("./animal.js")

mongoose.connection.on("open", async()=>{

    const scrubbedData = animalData.map((d)=>{

        return{
            species: d.species,
            extinct: d.extinct,
            location: d.location,
            lifeExpectancy: d.lifeExpectancy
        }
    })
    await dataModel.deleteMany({})
    await dataModel.create(scrubbedData)
    mongoose.connection.close()

    // console.log(scrubbedData[0]);
})