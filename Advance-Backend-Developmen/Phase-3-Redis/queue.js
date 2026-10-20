import { Queue } from "bullmq";
import { redis } from "./app.js";
import Redis from "ioredis";

const connection = new Redis("redis://127.0.0.1:6379", {
  maxRetriesPerRequest: null,
});

// type of queue and redis connection
const emailQueue = new Queue("emailQueue", { connection });

export default emailQueue;
