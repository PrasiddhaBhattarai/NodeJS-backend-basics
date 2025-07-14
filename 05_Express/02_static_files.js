// static files are the files that express allows to be accessed through urls(i.e. public files)
// app.use(express.static('public_file'))

//the files in directory "public_file" can be loaded as
// localhost:3000/___.txt

//you can include multiple directories
// app.use(express.static('public'))
// app.use(express.static('files'))

// const express = require('express')
import express from "express";

const app = express()
const port = 3000

app.use(express.static('public_file'))
//http://localhost:3000/message.txt
//since message.txt is inside public_file
//its contents are displayed when above url is loaded

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})