const Loan = require("../models/Loan");

const applyLoan = async (req, res) => {
  try {
    if (req.user.role !== "beneficiary") {
      return res.status(403).json({ message: "Only beneficiaries can apply for loans" });
    }

    const { amount, purpose } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    if (!purpose || purpose.trim() === "") {
      return res.status(400).json({ message: "Purpose is required" });
    }

    const loan = await Loan.create({
      user: req.user.id,
      amount,
      purpose,
    });

    res.status(201).json({
      success: true,
      message: "Loan applied successfully",
      data: loan,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    loan.status = "approved";
    await loan.save();

    res.json({ message: "Loan approved", loan });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const rejectLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    loan.status = "rejected";
    await loan.save();

    res.json({ message: "Loan rejected", loan });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMyLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: loans });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json({ success: true, data: loans });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { applyLoan, approveLoan, rejectLoan, getMyLoans, getAllLoans };