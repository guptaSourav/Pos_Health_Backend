const mongoose = require("mongoose");

const homeCollectionRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "call Done",
        "Follow Up",
        "Deal Closed",
        "Not Intrested",
        "Pending",
      ],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "HomeCollectionRequest",
  homeCollectionRequestSchema
);
