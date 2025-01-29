const Patient = require("../../Models/Users/Patient.models"); // Patient model
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

// In-memory storage for OTPs (use a database or cache in production)
const otpStore = new Map();

// Patient Signup
const signupPatient = async (req, res) => {
  try {
    const { name, email, phone, age, gender, password } = req.body;

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already registered" });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });

    console.log("otp : ", otp);
    // Store OTP along with patient details in-memory
    otpStore.set(email, { otp, name, phone, age, gender, password });

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Patient Signup",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to email for verification" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Verify OTP and Create Patient
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Retrieve stored OTP and patient details
    const storedData = otpStore.get(email);

    // console.log("otp stored Data:", storedData);

    if (!storedData || storedData.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Remove OTP from store after successful verification
    otpStore.delete(email);

    // Create patient using stored details
    const newPatient = new Patient({
      name: storedData.name,
      email,
      phone: storedData.phone,
      age: storedData.age,
      gender: storedData.gender,
      password: storedData.password, // Pre-hook will handle hashing
    });

    await newPatient.save();

    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Patient Login
const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find patient by email
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Compare password
    const isPasswordValid = await patient.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: patient._id, email: patient.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signupPatient, verifyOtp, loginPatient };
