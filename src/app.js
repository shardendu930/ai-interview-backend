const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const resumeRoutes = require("./routes/resume.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/temp", (req, res) => {
  res.json({
    message: "AI Interview Backend Running",
  });
});

module.exports = app;
