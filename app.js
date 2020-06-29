const express = require('express');

// express app

const app = express();

// register view engine

app.set('view engine', 'ejs')

// listen for requests

app.listen(3000);

// middleware & static pages

app.use(express.static('public'))


app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/about', (req, res)=>{
    res.render('about')
})

app.get('/blogs/create', (req, res)=>{
    res.render('create')
})

app.use((req,res)=>{
    res.status(404).render('404')
})