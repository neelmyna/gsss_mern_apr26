import express from "express";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.TRAINER_APP_PORT || 5000;
const MONGO_URI = process.env.TRAINER_MONGO_URI || "";

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// Mongo Schemas
// =======================

// Admin User
const AdminUserSchema = new Schema({
  email: String,
  password: String,
  role: Number,
  updated_time: { type: Date, default: Date.now }
});
const AdminUser = mongoose.model("admin_users", AdminUserSchema);

// Trainer
const TrainerSchema = new Schema({
  name: String,
  skills: [String],
  photo: String,
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  updated_user_id: String,
  updated_time: { type: Date, default: Date.now }
});
const Trainer = mongoose.model("trainer", TrainerSchema);

// =======================
// Trainer APIs
// =======================

// LIST / SEARCH
app.get("/api/trainers", async (req, res) => {
  const { search = "" }: any = req.query;

  const query = {
    name: { $regex: search, $options: "i" }
  };

  const trainers = await Trainer.find(query);

  res.json(trainers);
});

// CREATE (agent+)
app.post(
  "/api/trainers",
  async (req: any, res) => {
    const trainer = await Trainer.create({
      ...req.body,
      updated_user_id: "20001"
    });

    res.json(trainer);
  }
);

// VIEW
app.get("/api/trainers/:id", async (req, res) => {
  const trainer = await Trainer.findById(req.params.id);
  res.json(trainer);
});

// UPDATE (officer+)
app.put(
  "/api/trainers/:id",
  async (req: any, res) => {
    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updated_user_id: 20001,
        updated_time: new Date()
      },
      { new: true }
    );

    res.json(trainer);
  }
);

// DELETE (manager+)
app.delete(
  "/api/trainers/:id",
  async (req, res) => {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });
  }
);

// =======================
// INIT SUPER USER
// =======================

const createSuperUser = async () => {
  const exists = await AdminUser.findOne({ role: 4 });

  if (!exists) {
    const not_hashed = "1234";

    await AdminUser.create({
      email: "su@gmail.com",
      password: not_hashed,
      role: 4
    });

    console.log("Super user created");
  }
};

// =======================
// START SERVER
// =======================

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("Mongo connected");

    await createSuperUser();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));