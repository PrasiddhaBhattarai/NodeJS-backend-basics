// Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

// Middleware functions can perform the following tasks:

//  *)Execute any code.
//  *)Make changes to the request and the response objects.
//  *)End the request-response cycle.
//  *)Call the next middleware in the stack.

import express from "express";
import fs from 'fs';

const app = express();
const port = 3000;

// MiddleWare-1
// const myLogger = function (req, res, next) {
//     console.log('LOGGED')
//     next()
// }
// app.use(myLogger)
//or
app.use((req, res, next) => {
    console.log("middleware 1");

    //we can use middleware to maintain logs file
    fs.appendFileSync("08_logs.txt", `${new Date()}\n`);

    // res.send in middleware will intercept and stop req-res cycle
    // res.send("intercepted by middleware1")
    // next() after this will throw error

    //modify request
    req.author = "PB";

    next();
    //next() will pass controll to next middleware or to route handler incase of last middleware
})

// Middleware-2
app.use((req, res, next) => {
    console.log("middleware 2\n" + req.author);
    //previous one overriden
    req.author = "Prashidha"
    next()
})

app.get("/", (req, res) => {
    console.log("get request");
    res.send("hello its get and Author: " + req.author);
})

app.listen(port, () => {
    console.log(`server listening to port ${port}`);
})