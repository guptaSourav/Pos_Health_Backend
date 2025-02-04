const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    password: { type: String },
    specialty: {
      type: String,
      required: true,
      enum: [
        "Cardiology",
        "Neurology",
        "Orthopedics",
        "Dermatology",
        "Endocrinology",
        "Gastroentrology",
        "Neurology",
        "Oncology",
        "Pediatrics",
        "Psychiatry",
        "Urology",
      ],
    },
    phone: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: Number, required: true },
    availabilityTime: { type: [String], default: [] },
    availabilityDate: { type: [Date], default: [] },
    consultationFee: { type: Number, required: true },
    about: { type: String },
    imgUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
