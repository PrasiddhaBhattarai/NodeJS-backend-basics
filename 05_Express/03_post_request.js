// app.post() is a method in Express.js, a Node.js web framework, used to handle HTTP POST requests. The POST method is commonly used when a client (like a browser) sends data to the server, often in the form of a form submission or an API request. It is typically used for creating or updating resources on the server.

// When to use each method:
// (1) Use POST for creating new resources or actions that don’t fit neatly into other HTTP methods.
// (2) Use PUT for updating an existing resource.
// (3) Use PATCH for partially updating an existing resource (if you're only updating part of the resource).

import express from "express";

const app = express()
const port = 3000

app.use(express.static("public_file"));

// Middleware to parse JSON bodies
app.use(express.json());  // This is necessary to parse the request body as JSON

app.get("/", (req,res) => {
    res.send("Hello World!");
});

app.post("/", (req,res) =>{
    console.log("hello post");
    res.send("hello world post!");
});

app.post('/submit-form', (req, res) => {
    // Access the data from the request body
    const formData = req.body;
  
    // Handle the form data (e.g., save to a database, etc.)
    console.log('Received form data:', formData);
  
    // Send a response back to the client
    res.status(200).json({ message: 'Form submitted successfully!', data: formData });

    //status-200 means sucess/ Ok
    //.json means JSON response send back to client
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})