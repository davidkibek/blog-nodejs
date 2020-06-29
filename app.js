const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');
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

app.get('/blogs', (req, res)=>{
    Blog.find().sort({createdAt: -1})
        .then((results)=>{
            res.render('index', {blogs: results})
        })
   
})

app.get('/blogs/create', (req, res)=>{
    res.render('create')
})

app.post('/blogs', (req, res)=>{
    const blog = new Blog(req.body)

    blog.save()
        .then((result)=>{
            res.redirect('/blogs')
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.get('/blogs/:id', (req, res)=>{
   const id = req.params.id;
   Blog.findById(id)
    .then((results)=>{
        res.render('details',{blog: results})
    })
    .catch((err)=>{
        console.log(err)
    })   
})

app.delete('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
     .then((results)=>{
         res.json({redirect: '/blogs'})
     })
     .catch((err)=>{
         console.log(err)
     })   
 })


app.use((req,res)=>{
    res.status(404).render('404')
})