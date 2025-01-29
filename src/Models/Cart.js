const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "items.itemType" },
        itemType: { type: String, enum: ["Test", "HealthPackage"], required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    totalAmount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
