import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  console.log("Request received!");

  return res.status(200).json({
    message: "ASDASDASD",
  });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
