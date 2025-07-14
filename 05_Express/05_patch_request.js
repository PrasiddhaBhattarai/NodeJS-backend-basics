// PATCH request
// To perform a partial update on a resource, the PATCH HTTP method is the appropriate method to use, not PUT. 

// Why use PATCH?
// (1) Efficiency
// => PATCH allows you to send only the data that needs to be updated, rather than sending the entire resource. This reduces the payload size and is more efficient.
// (2) Semantics
// => PATCH specifically signals that only a partial update is happening, whereas PUT is intended for full resource replacement.

import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public_file"));

// Middleware to parse JSON bodies
app.use(express.json());  // This is necessary to parse the request body as JSON

//sample data to simulate database
const users = [
    { id: 1, name: 'Ronald', age: 25 },
    { id: 2, name: 'Inigo', age: 30 },
];

// Patch request to update user details
app.patch("/users/:id", (req, res) => {
    // get user ID from the URL
    const userID = parseInt(req.params.id, 10);
    const updatedUser = req.body;

    // find user
    const user = users.find(u => u.id === userID);

    if (!user) {
        return res.status(404).send({ message: "user not found" });
    }

    // Partially update the user data (only the fields provided in the request)
    if (updatedUser.name) {
        user.name = updatedUser.name
    };
    if (updatedUser.age) {
        user.age = updatedUser.age
    };

    // Respond with the updated user data
    res.json({ message: 'User partially updated', user });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})