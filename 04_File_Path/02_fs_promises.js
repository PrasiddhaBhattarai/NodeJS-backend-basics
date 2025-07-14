import fs from "fs/promises"

// console.log(fs);

// in EcmaScript module, await doesn't need to be in a async function
try {
    const data = await fs.readFile('one.txt', 'utf8');
    console.log(data);
} catch (err) {
    console.error('Error reading file:', err);
}

// or
fs.readFile("one.txt", "utf8")
.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.error("error in reading", err);
});