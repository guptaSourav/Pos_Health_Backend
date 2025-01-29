const accessControl = require("../Middleware/AccessControle.middleware");

const {
  addDoctor,
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
} = require("../Controllers/Doctor/Doctor.controller");

const express = require("express");

const router = express.Router();

// Doctor Routes
router.post("/add-new", accessControl(["admin"]), addDoctor);
router.patch("/update/:id", accessControl(["admin"]), updateDoctor);
router.delete("/delete/:id", accessControl(["admin"]), deleteDoctor);
router.get("/get-all", getAllDoctors);
router.get("/get-by-id/:id", getDoctorById);

module.exports = router;
