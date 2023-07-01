require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const animal = require('./models/animal');
const methodOverride = require('method-override');


const app = express();

//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride("_method"))

app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/animals', async (req, res) => {
    //get all the animals from the mongo db 
    const allanimals = await animal.find({});

    // and then render the index.ejs file
    res.render('index.ejs', { animals: allanimals })

})

//serve up the new.ejs file 
app.get('/animals/new', (req, res) => {
    res.render("new.ejs")
});


//whenever we click on the "add animal" button on the /animals/new page this will be called
app.post('/animals', async (req, res) => {
    if(req.body.completed === 'on'){
        req.body.completed = true;
    }else {
        req.body.completed = false;
    }
    await animal.create(req.body)
    res.redirect('/animals')
});

app.get('/animals/:id', async (req, res) => {
    const foundanimal = await animal.findById(req.params.id)
    res.render('show.ejs', { animal: foundanimal })
})

app.delete('/animals/:id', (req, res) => {
    console.log('hey i made it to this route');
    res.redirect('/animals')
})

app.delete('/animals/:id', async (req, res) => {
    await animal.findByIdAndDelete(req.params.id)
    res.redirect('/animals')
})

app.get('/animals/:id/edit', async (req, res) => {
    const animal = await animal.findById(req.params.id)
    res.render('edit.ejs', { animal})
})

app.put('/animals/:id', async (req, res) => {
    if(req.body.completed === 'on'){
        req.body.completed = true;
    }else {
        req.body.completed = false;
    }

    await animal.findByIdAndUpdate(req.params.id, req.body)

    res.redirect('/animals');
})

app.put('/animals/:id', async (req, res) => {
    if(req.body.completed === 'on'){
        req.body.completed = true;
    }else {
        req.body.completed = false;
    }

    await animal.findByIdAndUpdate(req.params.id, req.body)

    res.redirect('/animals');
})

app.listen(
    process.env.PORT,
    () => console.log(`listening to port ${process.env.PORT}`)
)