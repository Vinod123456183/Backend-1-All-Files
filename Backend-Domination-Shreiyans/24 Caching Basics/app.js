const express = require("express");
const app = express();
const redis = require("redis");
const mongoose = require("mongoose");
const userModel = require("./model/userModel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/Cahing").then(() => {
  console.log("Connected To DataBase !");
});

const client = redis.createClient({
  username: "default",
  password: "pYsoTMKGyn2FFoAA0TjM5u3Dof1Ix752",
  socket: {
    host: "redis-12204.c330.asia-south1-1.gce.redns.redis-cloud.com",
    port: 12204,
  },
});

client.on("connect", () => console.log("Connected To Redis"));
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

// Create user
app.post("/create", async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await userModel.create({ name, email });
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// to set in cahce
// app.get("/users/:id", async (req, res) => {
//   try {
//     const user = await userModel.findOne({ _id: req.params.id });
//     // user object me save hua hota h
//     // ye stigify hoga json bnega and cache me save hoga
//     await client.set(user:profile:${user._id}, JSON.stringify(user));
//     if (!user) {
//       return res.status(404).send("USER NOT FOUND");
//     }
//     res.send(user);
//   } catch (error) {
//     return res.status(40).send(error);
//   }
// });

/*






Data Save krte hue hum Data ko stingify krete h 
nikalte time we stingify








*/

/*

-> what is client ?

-> nodejs se redis k beech ka connection ko client bolte h

*/

// to get data from cache or database
// app.get("/users/:id", async (req, res) => {
//   try {
//     let data = await client.get(`user:profile:${req.params.id}`);

//     if (data) {
//       console.log("Cache Data is Sent");
//       return res.send(JSON.parse(data)); // If data is in cache, return it
//     }

//     console.log("Database Data Is Sent");

//     const user = await userModel.findOne({ _id: req.params.id });

//     if (!user) {
//       return res.status(404).send("USER NOT FOUND");
//     }

//     // Save the user data in the cache
//     await client.set(`user:profile:${user._id}`, JSON.stringify(user));

//     // Send the user data
//     res.send(user);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal Server Error");
//   }
// });

// Set Ex
// app.get("/users/:id", async (req, res) => {
//   try {
//     let data = await client.get(`user:profile:${req.params.id}`);

//     if (data) {
//       console.log("Cache Data is Sent");
//       return res.send(JSON.parse(data)); // If data is in cache, return it
//     }
//     console.log("Database Data Is Sent");
//     const user = await userModel.findOne({ _id: req.params.id });
//     if (!user) {
//       return res.status(404).send("USER NOT FOUND");
//     }
//     await client.setEx(
//       `user:profile:${req.params.id}`,
//       5,
//       JSON.stringify(user)
//     );
//     res.send(user);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal Server Error");
//   }
// });

// delete

app.get("/users/:id", async (req, res) => {
  try {
    await client.del(`user:profile:${req.params.id}`);

    console.log("Cache Deleted");

    const user = await userModel.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).send("USER NOT FOUND");
    }

    await client.setEx(
      `user:profile:${req.params.id}`,
      5, // Cache expiry time in seconds
      JSON.stringify(user)
    );

    res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
