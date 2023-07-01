const mongoose = require('./connection');

const animalSchema = new mongoose.Schema({
    // title: String,
    // author: String,
    // completed: Boolean

    name: { type: String, required: true},
    specie: { type: String, required: true},
    completed: Boolean
});

const animal = mongoose.model('animal', animalSchema);

module.exports = animal;