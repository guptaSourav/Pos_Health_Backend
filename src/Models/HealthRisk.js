const mongoose = require("mongoose");

const healthRiskSchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test", 
      },
    ],
  },
  { timestamps: true }
);

const HealthRisk = mongoose.model("HealthRisk", healthRiskSchema);

module.exports = HealthRisk;
