const {
    createBanner,
    updateBanner,
    deleteBanner,
    getBanners,
} = require("../Controllers/Banners/Banner.controller");
const accessControl = require("../Middleware/AccessControle.middleware");

const express = require("express");

const router = express.Router();

router.post("/create",accessControl(["admin"]), createBanner);
router.patch("/update/:id",accessControl(["admin"]), updateBanner);
router.delete("/delete/:id",accessControl(["admin"]), deleteBanner);
router.get("/get-all", getBanners);

module.exports = router;