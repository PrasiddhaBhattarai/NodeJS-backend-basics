const a = require("./myModule.js")

console.log(a);

// in commonJS,
// Before a module’s code is executed, NodeJS wraps it with a function wrapper(called module wrapper) that has the following structure:

// (function (exports, require, module, __filename, __dirname) {
//
//   //module code
//
// });
console.log();
console.log(exports);
console.log(require);
console.log(module);
console.log(__filename);
console.log(__dirname);