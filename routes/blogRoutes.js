const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();


router.get('/', (req, res)=>{
    Blog.find().sort({createdAt: -1})
        .then((results)=>{
            res.render('index', {blogs: results})
        })
   
})

router.get('/create', (req, res)=>{
    res.render('create')
})

router.post('/', (req, res)=>{
    const blog = new Blog(req.body)

    blog.save()
        .then((result)=>{
            res.redirect('/')
        })
        .catch((err)=>{
            console.log(err)
        })
})

router.get('/:id', (req, res)=>{
   const id = req.params.id;
   Blog.findById(id)
    .then((results)=>{
        res.render('details',{blog: results})
    })
    .catch((err)=>{
        console.log(err)
    })   
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
     .then((results)=>{
         res.json({redirect: '/'})
     })
     .catch((err)=>{
         console.log(err)
     })   
 })

 module.exports = router;