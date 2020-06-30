const express = require('express');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes')
// express app

const app = express();

//connect to mongodb
const dbURL = 'mongodb+srv://blog:1234@blog-rx99q.mongodb.net/blog?retryWrites=true&w=majority';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result)=> app.listen(3000))
    .catch((err)=>console.log(err))

// register view engine

app.set('view engine', 'ejs')

// middleware & static pages

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res)=>{
    res.redirect('/blogs')
})

app.get('/about', (req, res)=>{
    res.render('about')
})

// blog routes
app.use('/blogs',blogRoutes)

app.use((req,res)=>{
    res.status(404).render('404')
})