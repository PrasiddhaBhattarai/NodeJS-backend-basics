import path from "path";

// The path module in Node.js is a built-in utility that provides tools for working with file and directory paths. It allows you to handle and manipulate file paths in a way that is platform-independent

// console.log(path);

// Use path.join for concatenating multiple path segments into one.
// Use path.resolve to get an absolute path, resolving relative paths and considering the current working directory if necessary.
console.log(path.join('folder', 'subfolder', 'file.txt'));
// Output: 'folder\subfolder\file.txt'

console.log(path.join('folder', '/subfolder', 'file.txt'));
// Output: 'folder\subfolder\file.txt'

console.log(path.join("c:/", "pragram\\file.txt"));
// Output: 'c:\pragram\file.txt'

// path.resolve - always results in an absolute path
console.log(path.resolve('folder', 'subfolder', 'file.txt'));
// Output: 'D:\....\04_File_Path\folder\subfolder\file.txt'

console.log(path.resolve('folder', '/subfolder', 'file.txt'));
// Output: 'D:\subfolder\file.txt' (the first "/" from right, absolute path '/subfolder' is used)

// here "\\" used instead of "\" because "\" is compliled as escape
// let myPath = "D:\\desktop\\JS Backend\\File_Path\\folder\\subfolder\\file.txt";

let myPath = "D:/desktop/JS Backend/File_Path/folder/subfolder/file.txt";

console.log(path.extname(myPath));
// .txt
console.log(path.dirname(myPath));
// D:\desktop\JS Backend\File_Path\folder\subfolder
console.log(path.basename(myPath));
// file.txt