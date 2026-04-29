require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
const loanRoutes = require("./src/routes/loanRoutes");

app.use("/api/loans", loanRoutes);
app.use("/api/auth", require("./src/routes/authRoutes"));
console.log(process.env.MONGO_URI);