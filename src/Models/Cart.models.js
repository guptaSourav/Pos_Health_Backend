const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    services: [
      {
        serviceType: { type: String, required: true }, // E.g., "Blood Test", "Health Package"
        serviceName: { type: String, required: true }, // E.g., "Complete Blood Test"
        price: { type: Number, required: true },
        additionalDetails: { type: String }, // Optional notes for the service
      },
    ],
    subtotal: { type: Number, required: true }, // Total price of items in the cart
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('Cart', cartSchema);
