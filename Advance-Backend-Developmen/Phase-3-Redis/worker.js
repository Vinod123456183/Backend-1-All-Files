import { Worker } from "bullmq";
import Redis from "ioredis";
import sendEmail from "./lib/sendEmail.js";

const connection = new Redis("redis://127.0.0.1:6379", {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "emailQueue",
  async (job) => {
    console.log("Job Started");

    const email = job.data.email;
    await sendEmail(email);

    console.log("Job Completed");
  },
  { connection },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});
