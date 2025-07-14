//initially to use ES module,
//"type" : "module"

import {a,b, sayHello} from "./myModule.js";
console.log(a,b);
sayHello();

//no curly braces for default import
// also no need for name to match
import anyName from "./myModule.js"
console.log(anyName);
// anyName();

// EcmaScript doesn't have module wrapper like commonJS
// But for module path,
console.log(import.meta.url);