const {
  createAppointment,
  updateAppointmentStatus,
  getAllAppointments,
} = require("../Controllers/Appointment/Appointment.controller");
const express = require("express");
const accessControl = require("../Middleware/AccessControle.middleware");

const router = express.Router();

router.post("/request", createAppointment);
router.patch("/update-status/:appointmentId", updateAppointmentStatus);
router.get("/get-all-request", getAllAppointments);

module.exports = router;
