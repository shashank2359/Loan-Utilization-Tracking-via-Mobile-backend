const express = require("express");
const router = express.Router();

const { register, login, getProfile, updateProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);
const { getAllUsers } = require("../controllers/authController");

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);
module.exports = router;