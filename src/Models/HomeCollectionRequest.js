const mongoose = require("mongoose");

const homeCollectionRequestSchema = new mongoose.Schema(
  {
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "call Done",
        "follow_up",
        "deal_closed",
        "not_interested",
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
