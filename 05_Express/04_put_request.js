// PUT request
// it is used to completely replace a resource on the server 

// Key Point
// (1) Full replacement
// => When you send a PUT request to update a resource, you are expected to provide the full representation of the resource. This means that all fields of the resource should be included in the request payload, even if you're only changing one field. If any fields are missing in the request body, they may be overwritten with default or empty values, depending on the server's implementation.
// (2) Idempotency
// => PUT is idempotent, which means that sending the same PUT request multiple times should result in the same outcome. For example, if you send

import express from "express";

const app = express()
const port = 3000

app.use(express.static("public_file"));

// Middleware to parse JSON bodies
app.use(express.json());  // This is necessary to parse the request body as JSON

//sample data to simulate database
const users = [
    { id: 1, name: 'Ronald', age: 25 },
    { id: 2, name: 'Inigo', age: 30 },
];

// PUT request to update user details
app.put("/users/:id", (req, res) => {
    // get user ID from the URL
    const userID = parseInt(req.params.id, 10);
    const updatedUser = req.body;

    // find user
    const user = users.find(u => u.id === userID);

    if (!user) {
        return res.status(404).send({ message: "user not found" });
    }

    // Update the user data
    // this is a common pattern used in JavaScript to conditionally update a property of an object, while keeping the current value if no new value is provided.
    user.name = updatedUser.name || user.name;
    //  "||" operator: This is the logical OR operator. It checks the truthiness of the value on the left (updatedUser.name). If updatedUser.name is a "truthy" value (i.e., not undefined, null, false, 0, an empty string "", or NaN), it will use that value. Otherwise, it will fallback to the value on the right (user.name), which is the current value of the name property.
    user.age = updatedUser.age || user.age;

    console.log(users);
    //in real world, you wouldn't update an in-memory array like this. You would typically interact with a database, use db command to save changes.

    res.send({ message: 'User updated successfully', user });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})