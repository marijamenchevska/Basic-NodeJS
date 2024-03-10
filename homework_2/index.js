/* Part 1:
   - Create server using HTTP module;
   - When the default url is hit return HTML content to the user, the content of your choice.
   - When the url /student is hit, return HTML with the information:
       * Student name: "your name";
       * Student lastname: "your lastname";
       * Academy: "the academy you are at";
       * Subject: "the current subject we are learning";
       
   Part 2:
   - Create server using HTTP module (or use the one from the previous part);
   - When the default url is hit return HTML content to the user, the content of your choice;
   - When the url /add_student is hit, return a form with one input (ex. name) and a button;
   - When we submit the button we will navigate to a new route /all_students;
   - In this new url /all_students get the value that is sent from the form and console.log it human-readable format (ex. "The student name is: name");

   BONUS:
   Instead of console.log the value from the form, use the FS module to write in a file named: students.txt
*/

import http from 'http';
import fs from 'fs';

const PORT = 3000;
const HOSTNAME = 'localhost';

const server = http.createServer((req, res) => {
    const URL = req.url;

    if(URL === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1>This is a server created for homework_2</h1>');
        res.end();
    }

    if(URL === '/student') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <h4>Student name: Marija
            <h4>Student last name: Menchevska</h4>
            <h4>Academy: Academy for programming</h4>
            <h4>Subject: Basic Node.js</h4>
        `);
        res.end();
    }

    if(URL === '/add_student') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <form action='/all_students' method='POST'>
                <input type='text' name='studentName' placeholder='Enter student name'/>
                <button type='submit'>Add student</button>
            </form>
        `);
        res.end();
    }

    if(URL === '/all_students') {
        const chunks = [];

        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => {
            const parsedChunks = Buffer.concat(chunks).toString();
            const studentName = parsedChunks.split('=')[1].split('+').join(' ');
            fs.appendFileSync('students.txt', `The student name is: ${studentName}.\n`, 'utf-8');
        });

        res.setHeader('Content-Type', 'text/html');
        res.write('<h1>Student has been added.</h1>');
        res.end();
    }
});

server.listen(PORT, HOSTNAME, () => console.log(`Server has started, and is listening at http://${HOSTNAME}:${PORT}`));