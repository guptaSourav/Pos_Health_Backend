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

router.post("/add-new",  addDoctor);
router.patch("/update/:id",  updateDoctor);
router.delete("/delete/:id",  deleteDoctor);
router.get("/get-all", getAllDoctors);
router.get("/get-by-id/:id", getDoctorById);

module.exports = router;
