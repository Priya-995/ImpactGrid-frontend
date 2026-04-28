const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const caseRoutes = require("./routes/CaseRoutes");
const volunteerRoutes = require("./routes/VolunteerRoutes");
const geminiRoutes = require("./routes/gemini");


const app = express();

// ✅ Allow all Vercel URLs + localhost
const vercelPreview = /^https:\/\/.*\.vercel\.app$/;

// ✅ Removed app.options() entirely — not needed, cors() handles preflight
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || vercelPreview.test(origin) || origin === "http://localhost:8080" || origin === "http://localhost:5173") {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ImpactGrid API is running");
});

app.use("/api/cases", caseRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/gemini", geminiRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });