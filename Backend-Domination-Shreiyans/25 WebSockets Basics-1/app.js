const express = require("express");
const app = express();
const socketIo = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);

app.set("view engine", "ejs");

io.on("connection", (socket) => {
  console.log("A user connected");
});

app.get("/", (req, res) => {
  // humne y page khola
  //   fronted pr chla y io function
  //   iski wajah se frontend se backend pr gya connection event
  //   and backend pr handle kiya h
  res.render("index");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
