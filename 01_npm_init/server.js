var slugify1 = require('slugify')

let a = slugify1("some string")

let b = slugify1("some string", "->")

console.log(a);
console.log(b);

// an example of node.js application
const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;
const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello World</h1>');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});