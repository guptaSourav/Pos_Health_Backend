const {
  createHealthPackage,
  getAllHealthPackages,
  getHealthPackageById,
  updateHealthPackage,
  deleteHealthPackage,
} = require("../Controllers/HealthPackage/HealthPackage.controller");
const accessControl = require("../Middleware/AccessControle.middleware");

const express = require("express");

const router = express.Router();

// Health Package Routes
router.post("/add-new",  createHealthPackage);
router.get("/get-all", getAllHealthPackages);
router.get("/get-by-id/:id", getHealthPackageById);
router.patch("/update/:id",  updateHealthPackage);
router.delete("/delete/:id",  deleteHealthPackage);

module.exports = router;
