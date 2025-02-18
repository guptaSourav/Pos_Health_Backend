const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const patientSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String, required: false },
    city: { type: String, required: false },
    pinCode: { type: String, required: false },
    gender:{type:String,required:true},
    age: { type: Number },
    medicalHistory: { type: [String], default: [] }, // E.g., ["Diabetes"]
    role: { type: String, default: "Patient" },
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
