// Serving HTML files
// make template directory and add index.html, just make it organized

import express from "express";
// to get __dirname in es6
import path from 'path';
import url from 'url';

const app = express();
const port = 3000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(import.meta.url);
console.log(__filename);
console.log(__dirname);

// file:///E:/desktop/New%20folder/New%20folder%20(2)/New%20folder/wd/JS_Backend/JS_backend_CWH/05_Express/06_serve_htmlfile.js

// E:\desktop\New folder\New folder (2)\New folder\wd\JS_Backend\JS_backend_CWH\05_Express\06_serve_htmlfile.js

// E:\desktop\New folder\New folder (2)\New folder\wd\JS_Backend\JS_backend_CWH\05_Express

app.get('/', (req, res) => {
    console.log("one");
    res.send('Hello Hello!')
})

app.get('/index', (req, res) => {
    console.log("sering html file");
    console.log(__dirname);
    res.sendFile('templates/index.html', {root: __dirname});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 