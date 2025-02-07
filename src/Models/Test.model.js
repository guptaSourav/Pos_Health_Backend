const mongoose = require("mongoose");

// Define the test schema
const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum:["Blood","Speciality"]
    },
    description: {
      type: String,
      required: true,
    },
    preparation: {
      type: [String],
      required: true,
    },
    parameters: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    turnaroundTime: {
      type: String,
      required: true,
    },
    published : {
        type: Boolean,
        default: true
    },
    bookingsCount: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
); // Optionally, add timestamps to track when records are created or updated

// Create and export the Test model
const Test = mongoose.model("Test", testSchema);
module.exports = Test;
