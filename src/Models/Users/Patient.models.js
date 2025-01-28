const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    age: { type: Number },
    medicalHistory: { type: [String], default: [] }, // E.g., ["Diabetes"]
  },
  { timestamps: true }
);

// Pre-save hook to hash the password
patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
patientSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Patient", patientSchema);
