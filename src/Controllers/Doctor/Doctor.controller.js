const Doctor = require("../../Models/Users/Doctor.models");

// Add a new doctor (Admin only)
const addDoctor = async (req, res) => {
  try {
    const doctorData = req.body;

    // Check if doctor with same email or license already exists
    const existingDoctor = await Doctor.findOne({
      $or: [{ email: doctorData.email }],
    });

    if (existingDoctor) {
      return res
        .status(400)
        .json({
          message: "Doctor already exists with this email or license number",
        });
    }

    // Create and save new doctor
    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    res
      .status(201)
      .json({ message: "Doctor added successfully", doctor: newDoctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update doctor details
const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res
      .status(200)
      .json({ message: "Doctor updated successfully", doctor: updatedDoctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addDoctor,
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
};
