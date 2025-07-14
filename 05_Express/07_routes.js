import express from "express";
//importing route
import blog from "./routes/blog.js";

const app = express();
const port = 3000;

// any aroutes starting with "/blog" will be handled with another file
app.use("/blog", blog);
// here the route file (blog.js), "/blog" will be the root route

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 