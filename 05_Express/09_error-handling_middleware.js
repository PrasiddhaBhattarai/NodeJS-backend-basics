//Error-handling middleware
// it has four parameters
// function (err, req, res, next)

// usually middlrewares come before route handlers but,
// Error-handling middleware comes after route handlers and other middleware. This is the key difference between error-handling middleware and regular middleware in Express.js.

// If the error-handling middleware is defined before the route handlers, it will never catch any errors because the request would be intercepted by the error handler before reaching the route handler.

import express from "express";

const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log('This is a middleware before the route.');
    //throwing error directly

    // throw new Error('Error in middleware!!!');

    //output:
    // server listening to port 3000
    // This is a middleware before the route.
    // Error in middleware!!!


    // using next(err) to Pass error

    const err = new Error("!!!!!Error in middleware")
    next(err);

    //output:
    // server listening to port 3000
    // This is a middleware before the route.
    // !!!!!Error in middleware
    // after error Throw in middleware

    console.log("after error Throw in middleware");

    //won't work
    // next();
});

app.use((req, res, next) => {
    console.log("middleware-2");
    next();
})

// Route handler (it won't be reached because of the error in middleware)
app.get('/', (req, res) => {
    console.log("its get request");
    res.send('Hello, World!');
});

// Error-handling middleware comes after all route handlers and middleware
app.use((err, req, res, next) => {
    console.error(err.message);  // Log the error
    res.status(500).json({
        message: 'An unexpected error occurred',
        details: err.message
    });
});

app.listen(port, () => {
    console.log(`server listening to port ${port}`);
})

//also look image
//difference between throw error and next(error)

// Throwing an error works well for synchronous errors, where you immediately want to exit the current function and pass control to the next error handler.

// Using next(err) is the preferred method for handling asynchronous errors, where the error occurs after some async task completes (e.g., in a callback, promise, or async function. in operations like file reading, database queries, API calls). It allows you to handle errors that arise after an asynchronous operation finishes.

// Both methods achieve the same goal: passing errors to the error-handling middleware. However, they are used in different scenarios depending on whether you're working with synchronous or asynchronous code.



// Usage in a Real Scenario

// In a real-world application, you might have several routes and middleware where errors can occur. With error handling middleware, you can catch and respond to all errors in a consistent way.

// For example, if a route tries to access a database and the connection fails, the error handling middleware ensures that a proper error message is returned to the client instead of exposing the internal error details.

// Best Practices
// 1) Handle Errors Early: 
// Catch potential errors early in route handlers or middleware and pass them to the error handling middleware.
// 2) Avoid Exposing Stack Traces: 
// In production environments, you should avoid sending the full stack trace in the error response to prevent sensitive information from being exposed. Instead, you can log the error internally for debugging purposes.
// 3) Graceful Shutdown: 
// Consider handling unhandled promise rejections and uncaught exceptions globally and perform a graceful shutdown to prevent data corruption.