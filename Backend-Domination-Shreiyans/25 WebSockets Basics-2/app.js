const express = require("express");
const app = express();
const socketIo = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);

app.set("view engine", "ejs");

io.on("connection", (socket) => {
  //har bande k paas ek id hoti h n tabs = n id
  // jitne logo k paas fronted h unke paas id hogi
  // dono frontend pr io function chlega
  // ek ek connection req gyi backend pr
  // ek bnde k liye socket
  console.log(socket.id);
  socket.on("disconnect", () => {
    console.log("Disconnected"); // means tab close kr dena
  });
});

// jitne baar reload krenge utni baar print hoga

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
