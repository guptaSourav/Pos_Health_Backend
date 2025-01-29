const mongoose = require("mongoose");

const healthPackageSchema = new mongoose.Schema(
  {
    packageName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    includeTests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true }],
    imgUrl:{ type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthPackage", healthPackageSchema);
