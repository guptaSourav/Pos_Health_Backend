const express = require("express");
const router = express.Router();
const { signupPatient, verifyOtp, loginPatient } = require("../Controllers/Patient/Patient.controller"); // Update the path if necessary


router.post("/signup", signupPatient);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginPatient);

module.exports = router;
