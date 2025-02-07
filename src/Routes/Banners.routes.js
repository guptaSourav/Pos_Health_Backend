const {
    createBanner,
    updateBanner,
    deleteBanner,
    getBanners,
} = require("../Controllers/Banners/Banner.controller");

const express = require("express");

const router = express.Router();

router.post("/create", createBanner);
router.patch("/update/:id", updateBanner);
router.delete("/delete/:id", deleteBanner);
router.get("/get-all", getBanners);

module.exports = router;