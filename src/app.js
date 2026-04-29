const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const loanRoutes = require("./routes/loanRoutes");
app.use("/api/loans", loanRoutes);

module.exports = app;