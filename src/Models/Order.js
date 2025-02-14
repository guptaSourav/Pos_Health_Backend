const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "items.itemType" },
        itemType: { type: String, enum: ["Test", "HealthPackage"], required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      }
    ],
    receiptUrl: { type: String },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["COD"], default: "COD" },
    status: { type: String, enum: ["pending", "called", "follow-up", "closed"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
