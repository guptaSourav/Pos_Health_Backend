const {
  createAppointment,
  updateAppointmentStatus,
  getAllAppointments,
} = require("../Controllers/Appointment/Appointment.controller");
const express = require("express");
const accessControl = require("../Middleware/AccessControle.middleware");

const router = express.Router();

router.post("/request",accessControl(["Patient"]), createAppointment);
router.patch("/update-status/:id",accessControl(["admin"]), updateAppointmentStatus);
router.get("/get-all-request",accessControl(["admin"]), getAllAppointments);

module.exports = router;
