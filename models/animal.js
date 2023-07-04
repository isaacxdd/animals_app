const mongoose = require('./connection');

const animalSchema = new mongoose.Schema({

    species:String,
    extinct:Boolean,
    location:String,
    lifeExpectancy:Number,
    color:String
})

const dataModel = mongoose.model('animal', animalSchema);

module.exports = dataModel;