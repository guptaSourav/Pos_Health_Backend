const {
    createHealthRisk,
    getAllHealthRisks,
    getHealthRiskById,
    updateHealthRisk,
    deleteHealthRisk,
} = require("../Controllers/HealthRisk/HealthRisk.controller");
const express = require("express");

const router = express.Router();

router.post("/add-new",createHealthRisk);
router.patch("/update/:id",updateHealthRisk);
router.get("/get-all",getAllHealthRisks);
router.get("/get-by-id/:id",getHealthRiskById);
router.delete("/delete/:id",deleteHealthRisk);


module.exports = router;