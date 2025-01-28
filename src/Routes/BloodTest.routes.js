const {
    createBloodTest,
    updateBloodTest,
    deleteBloodTest,
} = require("../Controllers/BloodTestManagement/BloodTest.controller");

const express = require("express");
const accessControl = require("../Middleware/AccessControle.middleware");

const router = express.Router();

// Create a new blood test
router.post("/add-new",accessControl(["admin"]), createBloodTest);
router.patch("/update/:id",accessControl(["admin"]), updateBloodTest);
router.delete("/delete/:id",accessControl(["admin"]), deleteBloodTest);

module.exports = router;
