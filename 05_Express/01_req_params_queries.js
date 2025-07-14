// request parameters and request queries

// const express = require('express')
import express from "express";

const app = express()
const port = 3000

// app.get or app.post or app.put or app.delete(path, handler)
app.get('/', (req, res) => {
  console.log("one");
  res.send('Hello Hello!')
})

app.get('/blog', (req,res) => {
  res.send('Hello Blog')
})

// app.get('/blog/intro-to-js', (req,res) => {
//   res.send('Hello Blog, Intro to JS')
// })
// app.get('/blog/intro-to-python', (req,res) => {
//   res.send('Hello Blog, Intro to Python')
// })

//use request parameter instead to writing for each
app.get('/blog/:slug', (req,res) => {
  // for, http://localhost:3000/blog/just-beat-it?mode=dark&region=np
  console.log(req.params);
  //req.params => { slug: 'just-beat-it' }
  console.log(req.query);
  //after "?" in url
  //req.query => { mode: 'dark', region: 'np' }
  res.send(`Hello Blog, ${req.params.slug}`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//just an example of route handlers chaining
// app.route('/book')
//   .get((req, res) => {
//     res.send('Get a random book')
//   })
//   .post((req, res) => {
//     res.send('Add a book')
//   })
//   .put((req, res) => {
//     res.send('Update the book')
//   })