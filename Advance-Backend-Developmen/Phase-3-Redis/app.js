import express, { response } from "express";
import dotenv from "dotenv";
import connectDb from "./lib/db.js";

import rateLimmiter from "./middleware/ratelimit.js";

import User from "./model/user.model.js";
import Redis from "ioredis";
import sendEmail from "./lib/sendEmail.js";
import emailQueue from "./queue.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

export const redis = new Redis(process.env.REDIS_URL);

// ⭕‼️⭕ =>  To Check whether Redis is connected or not .

redis.on("connect", () => {
  console.log("Redis connected successfully");
});

redis.on("error", (error) => {
  console.error("Redis error:", error.message);
});
app.use(express.json());

// ⭕‼️⭕ => Rate Limiting , to avoid extra requests .
// without redis .
// with ratelimmiter
app.get("/", rateLimmiter, (req, res) => {
  console.log("Request received!");

  return res.status(200).json({
    message: "ASDASDASD",
  });
});

// ⭕‼️⭕ =>  To understand Caching in the Redis

// with redis
// agar data muk gya toh wahi se return , wrna db se fetch and agli baar new data redis me dalenge .

// jab data get = Json m parse
// Jab data set = json ko string m
app.get("/redis", async (req, res) => {
  const cached = await redis.get("user:all");

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const user = await User.find({});
  await redis.set("user:all", JSON.stringify(user)); // bec yahan data string me rakhte h .;
  return res.json(user);
});

// jaise new user create , waise redis m bhi upate new thing , wrna purana hi aaega wahan se .
// app.post("/create", async (req, res) => {
//   const { name, email, password } = req.body;
//   await redis.del("user:all");
//   const user = await User.create({
//     name,
//     email,
//     password,
//   });

//   return res.json(user);
// });

// ⭕‼️⭕ Que 1 :  => Create User Without Queue

// app.post("/create", async (req, res) => {
//   const { name, email, password } = req.body;
//   await redis.del("user:all");
//   const user = await User.create({
//     name,
//     email,
//     password,
//   });

//   await sendEmail();

//   return res.json(user);
// });

// ⭕‼️⭕ Que 2 :  => Create with Queue

app.post("/create", async (req, res) => {
  const { name, email, password } = req.body;
  await redis.del("user:all");
  const user = await User.create({
    name,
    email,
    password,
  });
  // "job-ka-naam"

  await emailQueue.add("send-email", { email });
  return res.json(user);
});

app.get("/get", async (req, res) => {
  const user = await User.find({});
  return res.json(user);
});

// ⭕‼️⭕ =>  To understand Caching in the Redis With OTP Verification

// Generate OTP + Get OTP .
// agar yahi kaam db se krenge toh bahut time lgega , so we use redis
// auto delete feature is also

app.post("/send", async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await redis.set(`otp:${email}`, otp, "EX", 3);

  return res.status(200).json({
    message: "OTP generated successfully",
    otp,
  });
});

app.post("/verify", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const storedOtp = await redis.get(`otp:${email}`);

    if (!storedOtp) {
      return res.status(404).json({
        message: "OTP not found or expired",
      });
    }

    if (storedOtp !== String(otp)) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    await redis.del(`otp:${email}`);

    return res.status(200).json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("OTP verification error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
