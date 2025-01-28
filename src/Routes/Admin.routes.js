const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
} = require("../Controllers/Admin/Admin.controller");
const accessControl = require("../Middleware/AccessControle.middleware");

const express = require("express");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile",accessControl(["admin"]),getAdminProfile);


module.exports = router;