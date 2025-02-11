const {
  createAppointment,
  updateAppointmentStatus,
  getAllAppointments,
} = require("../Controllers/Appointment/Appointment.controller");
const express = require("express");
const accessControl = require("../Middleware/AccessControle.middleware");

const router = express.Router();

router.post("/create", createAppointment);
router.patch("/update-status/:appointmentId", updateAppointmentStatus);
router.get("/get-all", getAllAppointments);

module.exports = router;
