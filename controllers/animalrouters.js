const express = require("express")
const dataModel = require("../models/animal.js")
const router = express.Router()

//////////////////////////////////////////////////////////////////////////////INDEX
router.get("/", async (req, res) => {
   const totalAnimals = await dataModel.find({})
   res.render("index.ejs",{totalAnimals}) 
})


// /////////////////////////////////////////////////////////////////////////////////// NEW
router.get("/new", (req, res)=>{
    res.render("new.ejs")
} )

// ///////////////////////////////////////////////////////////////////////////////////DELETE
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const oneAnimal = await dataModel.findByIdAndDelete(id, req.body);
    res.redirect('/animal')
})

// /////////////////////////////////////////////////////////////////////////////////////UPDATE
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    req.body.extinct = req.body.extinct === 'on' ? true : false;
    const oneAnimal = await dataModel.findByIdAndUpdate(id, req.body);
    res.redirect('/animal')
})
// ///////////////////////////////////////////////////////////////////////////////////////CREATE
router.post('/', async (req, res) => {
    if(req.body.extinct === 'on'){
        req.body.extinct = true;
    }else {
        req.body.readyToEat = false;
    }
   const addAnimal= await dataModel.create(req.body);
    res.redirect('/animal');
})


// //////////////////////////////////////////////////////////////////////////////////////// EDIT
router.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const oneAnimal = await dataModel.findById(id);
    res.render('edit.ejs', {oneAnimal})
})

// /////////////////////////////////////////////////////////////////////////////////////////SHOW
router.get("/:id", async (req, res)=>{
    const id = req.params.id
    const oneAnimal =  await dataModel.findById(id)
    res.render("show.ejs", {oneAnimal, id})
})


module.exports= router