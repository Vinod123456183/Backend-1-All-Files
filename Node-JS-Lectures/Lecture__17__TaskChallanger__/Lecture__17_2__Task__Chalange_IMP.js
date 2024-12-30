const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

const emmiter = new EventEmitter();

// File path for storing event counts
const eventCountFilePath = path.join(__dirname, 'eventCount.json');

// Read event count from file (if exists)
let eventCount = {
    'user-login': 0,
    'user-purchased': 0,
    'profile-update': 0,
    'user-logged': 0
};

// Check if the file exists and load it if it does
if (fs.existsSync(eventCountFilePath)) {
    const data = fs.readFileSync(eventCountFilePath, 'utf-8');
    eventCount = JSON.parse(data);
}

// Event handlers
emmiter.on('user-login', (username) => {
    eventCount['user-login']++;
    console.log(`${username} logged in`);
    saveEventCount();
});

emmiter.on('user-purchased', (username, item) => {
    eventCount['user-purchased']++;
    console.log(`${username} purchased ${item}`);
    saveEventCount();
});

emmiter.on('profile-update', (username, upd) => {
    eventCount['profile-update']++;
    console.log(`${username} updated ${upd}`);
    saveEventCount();
});

emmiter.on('profile-logut', (username) => {
    eventCount['user-logged']++;
    console.log(`Logged out ${username}`);
    saveEventCount();
});

// Function to save event count to the file
function saveEventCount() {
    fs.writeFileSync(eventCountFilePath, JSON.stringify(eventCount, null, 2), 'utf-8');
}

// Example event to print the counts
emmiter.on('example', () => {
    console.log(eventCount);
});

// Trigger events
emmiter.emit('user-login', 'thapa');
emmiter.emit('user-purchased', 'thapa', 'MacBook');
emmiter.emit('profile-update', 'thapa', 'email');
emmiter.emit('profile-logut', 'thapa');

emmiter.emit('example');
