const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());

/* ---------------- DATABASE CONNECTION ---------------- */

mongoose.connect("mongodb+srv://vannudoms_db_user:hp0NP32bQVUCiSt4@cluster0.o8sjqfr.mongodb.net/poe")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB error:", err));

/* ---------------- MODEL ---------------- */

const WorkSchema = new mongoose.Schema({
  title: String,
  content: String,
  year: Number
});

const Work = mongoose.model("Work", WorkSchema);

/* ---------------- ROUTES ---------------- */

// Home test route
app.get("/", (req, res) => {
  res.send("Poe API is running 🚀");
});

// GET all works
app.get("/works", async (req, res) => {
  try {
    const works = await Work.find();
    res.json(works);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single work by ID
app.get("/works/:id", async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    res.json(work);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new work
app.post("/works", async (req, res) => {
  try {
    const work = new Work(req.body);
    await work.save();

    res.json({
      message: "Work saved",
      work
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE work
app.delete("/works/:id", async (req, res) => {
  try {
    await Work.findByIdAndDelete(req.params.id);

    res.json({
      message: "Work deleted"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- START SERVER ---------------- */

app.listen(3000, () => {
  console.log("Poe backend running on http://localhost:3000");
});