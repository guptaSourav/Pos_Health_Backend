const {
    createBloodTest,
    updateBloodTest,
    deleteBloodTest,
    getBloodTest,
    bloodTestPublished,
    bloodTestUnPublished,
} = require("../Controllers/BloodTestManagement/BloodTest.controller");

const express = require("express");
const accessControl = require("../Middleware/AccessControle.middleware");

const router = express.Router();

// Create a new blood test
router.post("/add-new", createBloodTest);
router.patch("/update/:id", updateBloodTest);
router.delete("/delete/:id", deleteBloodTest);
router.get("/get-all", getBloodTest);

router.patch("/publish",bloodTestPublished);
router.patch("/unpublish",bloodTestUnPublished);

module.exports = router;
