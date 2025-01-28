const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialty: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    availability: { type: [String], default: [] }, // E.g., ["Mon-Fri: 9am-5pm"]
    phone: { type: String, required: true },
    clinicAddress: { type: String },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password
doctorSchema.pre("save", async function (next) {
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
doctorSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Doctor", doctorSchema);
