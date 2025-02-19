const {
    createBloodTest,
    updateBloodTest,
    deleteBloodTest,
    getBloodTest,
    toggleBloodTestPublished,
    bloodTestUnPublished,
} = require("../Controllers/BloodTestManagement/BloodTest.controller");

const express = require("express");
const accessControl = require("../Middleware/AccessControle.middleware");

const router = express.Router();

// Create a new blood test
router.post("/add-new",accessControl(["admin"]), createBloodTest);
router.patch("/update/:id",accessControl(["admin"]), updateBloodTest);
router.delete("/delete/:id",accessControl(["admin"]), deleteBloodTest);
router.get("/get-all", getBloodTest);

router.patch("/toggle-publish/:id",accessControl(["admin"]),toggleBloodTestPublished);
router.patch("/unpublish",accessControl(["admin"]),bloodTestUnPublished);

module.exports = router;
