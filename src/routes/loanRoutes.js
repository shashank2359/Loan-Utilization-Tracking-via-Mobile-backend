const express = require("express");
const router = express.Router();

const {
  applyLoan,
  approveLoan,
  rejectLoan,
  getMyLoans,
  getAllLoans
} = require("../controllers/loanController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/apply", authMiddleware, applyLoan);
router.get("/my-loans", authMiddleware, getMyLoans);
router.get("/all", authMiddleware, adminMiddleware, getAllLoans);


router.put("/:id/approve", authMiddleware, adminMiddleware, approveLoan);
router.put("/:id/reject", authMiddleware, adminMiddleware, rejectLoan);

module.exports = router;