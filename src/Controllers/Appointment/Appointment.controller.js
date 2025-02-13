const Appointment = require("../../Models/Appointment"); // assuming model path
const Doctor = require("../../Models/Users/Doctor.models"); // assuming model path
const Patient = require("../../Models/Users/Patient.models");
// Create an appointment
const createAppointment = async (req, res) => {
  try {
    const { doctor: doctorId, reason } = req.body;
    const patientId = req.user.id;

    // Validate required fields
    if (!reason || !doctorId) {
      return res.status(400).json({ status: 400, message: "All fields are required" });
    }

    const patientData = await Patient.findById(patientId);

    if(!patientData){
      res.status(404).json({message:"No patient found!"});
    }

    // Check if the doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ status: 404, message: "Doctor not found!" });
    }

    // Create and save the appointment
    const newAppointment = await Appointment.create({
      patient:patientId,
      reason,
      doctor: doctorId,
      status: "pending", // Initial status
    });

    return res.status(201).json({ status: 201, message: "Appointment created successfully", data: newAppointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate the status value
    const validStatuses = ["pending", "confirmed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ status: 400, message: "Invalid status value" });
    }

    // Update the appointment status
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ status: 404, message: "Appointment not found" });
    }

    return res.status(200).json({ status: 200, message: "Appointment status updated successfully", data: appointment });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name specialty")
      .populate("patient", "fullName age gender mobileNumber ") // Fetch patient details
      .sort({ createdAt: -1 }); 

   
    return res.status(200).json({
      status: 200,
      message: "Appointments retrieved successfully",
      data: appointments,
    });
  } catch (error) {
    console.error("Error retrieving appointments:", error);
    return res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createAppointment,
  updateAppointmentStatus,
  getAllAppointments,
};
