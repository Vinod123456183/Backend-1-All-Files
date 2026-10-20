import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  console.log("Request received!");

  return res.status(200).json({
    message: `HI : ${PORT}`,
  });
});

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(
        `Server started at http://localhost:${PORT} , process.env.SERVER_NAME `,
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
