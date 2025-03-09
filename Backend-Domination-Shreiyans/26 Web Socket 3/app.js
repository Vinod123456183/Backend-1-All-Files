const express = require("express");
const app = express();
const socketIo = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);

app.set("view engine", "ejs");

// io.on("connection", (socket) => {
//   socket.on("abcd", (data) => {
//     console.log("HEy");
//     console.log(data);
//   });
// });

io.on("connection", (socket) => {
  socket.on("abcd", (data) => {
    console.log("Recieved");

    // ek side on toh dusre side emit
    // and
    // vice versa

    io.emit("defg"); //sbko recieve 
    // socket.emit  // sirf jo join usse recieve hoga

    // io.emit se sbko bj dega
    // socket.emit  personlay ek ko bjna
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
