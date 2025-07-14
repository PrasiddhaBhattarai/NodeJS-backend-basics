//https://github.com/mde/ejs/wiki/Using-EJS-with-Express

// this file was modified later, so don't know if it'll run


import express from "express";
const app = express();
const port = 3000;



// Set up EJS as the view engine

app.set("view engine", "ejs");
// This line tells Express that you are using EJS as your view engine.

app.set("views", path.join(__dirname, "views"));
// 1st paramater=> "views", when res.render(...) is encountered, the express looks for file in directory named views.
// 2nd parameter=> path of the "views" directory

//npm i express-ejs-layouts
app.use(expressLayouts);
// This line specifically comes from using the express-ejs-layouts middleware.
// is used in an Express.js application when you're working with EJS (Embedded JavaScript) templates and want to use layout files—kind of like a master template where you can inject content into predefined sections (like header, footer, etc.) from other views.

app.set('layout', 'mainLayout');
// Express will look for a layout file named mainLayout.ejs in the views(above mentioned) directory.

app.set("layout extractScripts", true);
// This setting tells express-ejs-layouts to extract scripts from individual views and place them into a specific section of your layout file (typically, this would be at the bottom of the page, before the </body> tag).
// 
// This means that any <script> tags defined in your views will be inserted into the layout at the location of <%- scripts %>, which is generally placed at the bottom of the body tag in the layout.

app.set("layout extractStyles", true);
// Similar to extractScripts, this setting tells express-ejs-layouts to extract CSS styles from individual views and place them into a designated section of your layout.
// 
// Any CSS stylesheets (<link> tags) declared in your individual views will be inserted into the layout where the <%- styles %> tag is placed. This is usually placed in the <head> section of your layout.



app.get("/",(req, res) => {
    res.send(`Go to "/card:slug`);
});

app.get("/card", (req, res) => {
    // perform some database queries to get data
    let cardTitle = "Adidas";
    let cardContent = "Its very good brand";
    let cardImage = "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    //to render a view template
    res.render( "index", {cardTitle, cardContent: cardContent, cardImage});
    // for variables(carsTitle, ...) passing with res.render(), the layout.ejs has access to that variable.




    // if key and value is of same name
    // {name: name},
    // its equivalent to {name}

    //variable name inside .ejs file
    // <%= variableName %>
    // here, <%= cardTitle %>

    //you can pass array too
    // let arr = [,,,]
    // use it as, <%= arr[0] %>
    // in general, <%= arr[i] %>
});

app.listen(port, () =>{
    console.log(`app listening on port ${port}`);
});