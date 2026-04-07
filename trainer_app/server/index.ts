import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.TRAINER_APP_PORT || 5000;
const MONGO_URI = process.env.TRAINER_MONGO_URI || "";

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDb");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));