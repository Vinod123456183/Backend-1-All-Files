// Tell everytinh about os 

const os = require('os');

// Get the home directory of the current user
const HomeDir = os.homedir();

// Get the hostname of the operating system
const HostName = os.hostname();

// Get the network interfaces and their details
const NetworkInterface = os.networkInterfaces();

// Get the system uptime in seconds
const upTime = os.uptime();

// Get the operating system type (e.g., 'Linux', 'Darwin', 'Windows_NT')
const osType = os.type();

// Log all the information


console.log("Operating System Type: ", osType);
console.log("Home Directory: ", HomeDir);
console.log("Host Name: ", HostName);
console.log("Network Interfaces: ", NetworkInterface);
console.log("System Uptime (in seconds): ", upTime);
