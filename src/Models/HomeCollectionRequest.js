const mongoose = require("mongoose");

const homeCollectionRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: String, required: true },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "call Done",
        "follow_up",
        "deal_closed",
        "not_intrested",
        "pending",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "HomeCollectionRequest",
  homeCollectionRequestSchema
);
