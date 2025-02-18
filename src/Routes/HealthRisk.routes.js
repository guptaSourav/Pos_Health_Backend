const {
    createHealthRisk,
    getAllHealthRisks,
    getHealthRiskById,
    updateHealthRisk,
    deleteHealthRisk,
} = require("../Controllers/HealthRisk/HealthRisk.controller");
const accessControl = require("../Middleware/AccessControle.middleware");
const express = require("express");

const router = express.Router();

router.post("/add-new",accessControl(["admin"]),createHealthRisk);
router.patch("/update/:id",accessControl(["admin"]),updateHealthRisk);
router.get("/get-all",getAllHealthRisks);
router.get("/get-by-id/:id",getHealthRiskById);
router.delete("/delete/:id",accessControl(["admin"]),deleteHealthRisk);


module.exports = router;