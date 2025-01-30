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
    address: { type: String, required: true },
    contact: { type: String, required: true },
    paymentMethod: { type: String, enum: ["COD"], default: "COD" },
    status: { type: String, enum: ["Pending", "Processing", "Completed", "Cancelled"], default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
