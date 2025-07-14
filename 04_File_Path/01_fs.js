import fs from "fs";

// console.log(fs);

// creates new file if doesn't exist
// replaces content if allready exists
fs.writeFileSync("one.txt", "my name is Khan");


//synchronous method

// const data = fs.readFileSync("one.txt");
// console.log(data.toString());
console.log(fs.readFileSync("one.txt").toString());

// By default, fs.readFile() returns a Buffer object, which you need to convert to a string. You can either specify the encoding ('utf8' for example) directly in the readFile method or manually convert the Buffer to a string using .toString().
console.log(fs.readFileSync("one.txt", "utf8").toString());


//asynchronous method, using callback

//also callback hell demonstration
// creates new file if doesn't exist
fs.appendFile("one.txt", " and I am not a terrorist",() =>{
    console.log("append complete");
    fs.readFile("one.txt", (error, data) => {
        console.log(error, data.toString());
        //again callback fuction and so-on
        //can result in callback hell
    })
})