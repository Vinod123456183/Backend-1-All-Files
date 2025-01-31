const mongoose = require('mongoose');
// if database created then it connect else mongodb itself create
// not industry standards
const debuglog = require('debug')('development:mongooseconfig')

mongoose.connect('mongodb://127.0.0.1:27017/testingdb');    // Connect to MongoDB with mongoose (without deprecated options)

const db = mongoose.connection; // Get the connection object

db.on("error", (err) => {   // Log error
    debuglog("Error: ", err);
});
db.on("open", () => {
    debuglog("Connected to Database!");
});

module.exports = db;



// Type npm i debug 
// $env:DEBUG='development:mongooseconfig'
