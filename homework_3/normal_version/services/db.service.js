import fs from 'fs';
export { readData, writeData, appendData };

function readData (dbPath) {
    return JSON.parse(fs.readFileSync(dbPath));
}

function writeData (dbPath, data) {
    fs.writeFileSync(dbPath, JSON.stringify(data));
}

function appendData (dbPath, data) {
    fs.appendFileSync(dbPath, data)
}

