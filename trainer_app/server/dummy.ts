import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.TRAINER_APP_PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// Trainer APIs
// =======================

// LIST / SEARCH (supervisor+)
app.get("/api/trainers", (req, res) => {
  const { search = "" }: any = req.query;

  const query = {
    name: { $regex: search, $options: "i" }
  };

  const trainers = [{id:"1234", name:"nithin", skills:"java"},
                    {id:"1235", name:"mahesh", skills:"dotnet"},
                    {id:"1236", name:"mani", skills:"java"}]

  res.json(trainers);
});

// CREATE (agent+)
app.post(
  "/api/trainers",
  (req: any, res) => {
    const trainer = {id:"1234", name:"nithin", skills:"java"}
    res.json(trainer);
  }
);

// VIEW (supervisor+)
app.get("/api/trainers/:id", (req, res) => {
  const trainer = {id:"1234", name:"nithin", skills:"java"}
  res.json(trainer);
});

// UPDATE (supervisor+)
app.put(
  "/api/trainers/:id",
  (req: any, res) => {
    const updated_trainer = {id:"44555", name:"nithin", skills:"java"}

    res.json(updated_trainer);
  }
);

// DELETE (manager)
app.delete(
  "/api/trainers/:id",
  (req, res) => {
    res.json({ message: "Deleted" });
  }
);

// =======================
// START SERVER
// =======================

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});