const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    permissions: { type: [String], default: [] },
    role: { type: String, default: "admin" },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

// Pre-save hook to hash the password
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password is not modified
  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
  } catch (err) {
    next(err); // Pass error to the next middleware
  }
});

// Method to compare passwords
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); // Compare passwords
};

module.exports = mongoose.model("Admin", adminSchema);
