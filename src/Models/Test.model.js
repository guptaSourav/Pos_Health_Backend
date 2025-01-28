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
    },
    description: {
      type: String,
      required: true,
    },
    testPreparation: {
      type: [String],
      required: true,
    },
    parameterTested: {
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
        default: false
    }
  },
  { timestamps: true }
); // Optionally, add timestamps to track when records are created or updated

// Create and export the Test model
const Test = mongoose.model("Test", testSchema);
module.exports = Test;
