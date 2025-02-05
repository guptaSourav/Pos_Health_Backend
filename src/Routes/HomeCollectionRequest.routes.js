const {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} = require("../Controllers/HomeCollectionRequest/HomeCollectionRequest.controller");
const accessControl = require("../Middleware/AccessControle.middleware");
const express = require("express");

const router = express.Router();


router.post("/request", createRequest);
router.get("/get-all-request", getAllRequests);
router.get("/get-request-by-id/:id", getRequestById);
router.patch("/update-request/:id", updateRequest);
router.delete("/delete-request/:id", deleteRequest);

module.exports = router;