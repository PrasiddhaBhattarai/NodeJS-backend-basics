// You have to write a Node.js program to clear clutter inside of a directory and organize the contents of that directory into different folders

// for example, these files become:

// 1. name.jpg
// 2. name.png
// 3. this.pdf 
// 4. harry.zip
// 5. Rohan.zip
// 6. cat.jpg 
// 7. harry.pdf

// this: 
// jpg/name.jpg, jpg/cat.jpg 
// png/name.png 
// pdf/this.pdf pdf/harry.pdf
// zip/harry.zip zip/Rohan.zip

import express from 'express';
import path from 'path';
import url from 'url';
import fs from 'fs';

// const app = express();
// const port = 3000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '/11_files');

// read all files and folders inside
const files = fs.readdirSync(filePath);
// console.log(files);

async function moveFiles() {
    // console.log("in function");
    for (const item of files) {
        // console.log("in loop");
        // console.log(item);
        let ext = path.extname(item).split(".")[1];
        // console.log(ext);

        // if there are files with no extension,
        // here, for directories
        if (!ext) {
            console.log(`Skipping ${item} (no extension)`);
            continue;
        }

        // var oldPath = 'old/path/file.txt'
        // var newPath = 'new/path/file.txt

        let oldFilePath = path.join(filePath, item);
        // console.log(oldFilePath);
        let dirPath = path.join(filePath, ext);
        // console.log(dirPath);
        let newFilePath = path.join(dirPath, item);
        // console.log(newFilePath);

        // Skip ext like .js or .json
        if (ext === 'js' || ext === 'json') {
            console.log(`Skipping ${item} (extension: ${ext})`);
            continue;
        }

        // if ext directory already exists
        if (fs.existsSync(dirPath)) {
            console.log("if");
            try {
                await fs.promises.rename(oldFilePath, newFilePath);
                console.log(`Moved: ${item} to: ${ext}`);
            } catch (err) {
                console.error(`Error moving file ${item}:`, err);
            }
        } else {
            console.log("else");
            // Create the directory if it doesn't exist and move the file
            try {
                await fs.promises.mkdir(dirPath);
                await fs.promises.rename(oldFilePath, newFilePath);
                console.log(`Created directory: ${ext} and moved: ${item}`);
            } catch (err) {
                console.error(`Error creating directory for ${item}:`, err);
            }
        }
    }
}

// Start moving files
moveFiles().catch(err => {
    console.error('Error organizing files:', err);
});

// app.listen(port, () => {
//     console.log('Server listening on port 3000');
// });
