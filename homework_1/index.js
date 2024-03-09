/* 1. Initialize a new npm project and create an index.js file.
   2. Using the fs module create a new file called homework.txt
   3. Create a path to the file using the path module
   4. Inside the file write the following "Homework 01 in Basic Node"
   5. Append to the file the following " FINISHED!"
   6. Read the file contents and print them out in the console.
*/

import fs from 'fs';
import path from 'path';
import fsPromises from 'fs/promises';

// Create the file
fs.appendFileSync('homework.txt', '', 'utf-8');
const filePath = path.join(import.meta.dirname, 'homework.txt');

// Synchronous fs methods

fs.writeFileSync(filePath, 'Homework 01 in Basic Node');
fs.appendFileSync(filePath, ' FINISHED!');
const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
console.log(fileContent);


// Asynchronous fs methods with fs promises

// fsPromises
//     .writeFile(filePath, 'Homework 01 in Basic Node')
//     .then(err => {
//         if(err) throw new Error ('Error while writing file.');
//         return fsPromises.appendFile(filePath, ' FINISHED!');
//     })
//     .then(err => {
//         if(err) throw new Error ('Error while appending new text.');
//         return fsPromises.readFile(filePath, { encoding: 'utf-8' });
//     })
//     .then(content => console.log(content))
//     .catch(err => console.log(err));



// Asynchronous fs methods with try-catch

// const fileReading = async () => {
//     try {
//         await fsPromises.writeFile(filePath, 'Homework 01 in Basic Node');
//         await fsPromises.appendFile(filePath, ' FINISHED!');
//         const fileContent = await fsPromises.readFile(filePath, { encoding: 'utf-8' });
//         console.log(fileContent);
//     }
//     catch(err) {
//         console.log('Something went wrong: ', err);
//     }
// }

// fileReading();
