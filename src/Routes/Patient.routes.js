const express = require("express");
const router = express.Router();
const {
  signupPatient,
  verifyOtp,
  loginPatient,
  updatePatientInfo,
  getAllPatients,
  getPatientData,
  getAppointmentInfo,
  getHomeCollectionInfo,
  getOrdersInfo
} = require("../Controllers/Patient/Patient.controller"); // Update the path if necessary
const accessControl = require("../Middleware/AccessControle.middleware");

router.post("/signup", signupPatient);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginPatient);
router.patch("/update-info/:patientId", updatePatientInfo);
router.get("/get-all", getAllPatients);
router.get("/get-profile-info",accessControl(["Patient"]), getPatientData);
router.get("/get-appointment-info",accessControl(["Patient"]),getAppointmentInfo);
router.get("/get-homeCollection-info",accessControl(["Patient"]),getHomeCollectionInfo);
router.get("/get-order-info",accessControl(["Patient"]),getOrdersInfo);



module.exports = router;
