const Patient = require("../../Models/Users/Patient.models"); // Patient model
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const Appointment = require("../../Models/Appointment");
const HomeCollectionRequest = require("../../Models/HomeCollectionRequest");
const Order = require("../../Models/Order");

const mongoose = require("mongoose");

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
      fullName: storedData.name,
      email,
      mobileNumber: storedData.phone,
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
      { id: patient._id, email: patient.email, role: patient.role },
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

const updatePatientInfo = async (req, res) => {
  const { patientId } = req.params; // Extract patient ID from URL params
  const { fullName, mobileNumber, age, gender, address, city, pinCode } =
    req.body;

  // Find patient by ID
  const patient = await Patient.findById(patientId);

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  // Update patient fields if provided
  if (fullName) patient.fullName = fullName;
  if (mobileNumber) patient.mobileNumber = mobileNumber;
  if (age) patient.age = age;
  if (gender) patient.gender = gender;
  if (address) patient.address = address;
  if (city) patient.city = city;
  if (pinCode) patient.pinCode = pinCode;

  // Save updated patient info
  await patient.save();

  res.status(200).json({
    message: "Patient profile updated successfully",
    patient,
  });
};

// Get All Patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select("-password"); // Exclude password for security
    res.status(200).json({ patients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPatientData = async (req, res) => {

  try {
    const patientId = req.user.id;

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    // console.log("patient data : ",patient);
    res.status(200).json({status:200,Patient:patient});
  } catch (error) {
    console.error("Error fetching patient data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAppointmentInfo = async (req, res) => {
  const patientId = req.user.id;

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const appointmentData = await Appointment.find({
      patient: patientId,
    }).populate("doctor", "name");

    if (appointmentData.length === 0) {
      return res
        .status(400)
        .json({ message: "No appointment booked", data: [] });
    }

    res.status(200).json({ Appointment: appointmentData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getHomeCollectionInfo = async (req, res) => {
  const patientId = req.user.id;

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const homeCollectionData = await HomeCollectionRequest.find({
      patient: patientId,
    });

    // console.log("home collection info : ", homeCollectionData);

    if (homeCollectionData.length === 0) {
      return res
        .status(400)
        .json({ message: "No home collection found", data: [] });
    }

    res.status(200).json({ HomeCollection: homeCollectionData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrdersInfo = async (req, res) => {
  try {
    const patientId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const orders = await Order.find({ userId: patientId }).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ Order: orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signupPatient,
  verifyOtp,
  loginPatient,
  updatePatientInfo,
  getAllPatients,
  getPatientData,
  getAppointmentInfo,
  getHomeCollectionInfo,
  getOrdersInfo,
};
