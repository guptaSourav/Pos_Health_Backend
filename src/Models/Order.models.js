const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }, // Optional for consultations
    services: [
      {
        serviceType: { type: String, required: true }, // E.g., "Blood Test", "Health Package"
        serviceName: { type: String, required: true }, // E.g., "Complete Blood Test"
        price: { type: Number, required: true },
        additionalDetails: { type: String }, // Optional notes for the service
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], default: 'Pending' },
    paymentMethod: { type: String, enum: ['Credit Card', 'UPI', 'Cash'], required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Failed'], default: 'Pending' },
    transactionId: { type: String }, // Optional for tracking payments
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

module.exports = mongoose.model('Order', orderSchema);
