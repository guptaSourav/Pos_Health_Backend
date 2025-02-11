const Appointment = require("../../Models/Appointment"); // assuming model path
const Doctor = require("../../Models/Users/Doctor.models"); // assuming model path

const createAppointment = async (req,res)=>{
  try {
    const {patientName, patientContact, doctorId, reason} = req.body;
    // Find the doctor
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return { message: "Doctor not found" };
    }

    if(!patientName || !patientCOntact || !reason){
      res.send(401).json({status:401,message:"Please enter required fields"});
    }

    // Create the appointment
    const newAppointment = new Appointment({
      patientName,
      patientContact,
      reason,
      doctor: doctorId,
      status: "pending", // Initial status
    });

    // Save the appointment
    await newAppointment.save();

    res.status(201).json({status:201,data:newAppointment});
  } catch (error) {
    return { message: "Error creating appointment", error };
  }
}

// Function to update the appointment status
const updateAppointmentStatus = async (req,res)=>{
  try {
    const {newStatus} = req.body;
    const appointmentId = req.params;
    // Validate the new status
    if (!["pending", "confirmed", "canceled"].includes(newStatus)) {
      return { message: "Invalid status" };
    }

    // Find the appointment by ID and update the status
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: newStatus }, // Update only the status
      { new: true } // Return the updated document
    );

    if (!appointment) {
      return { message: "Appointment not found" };
    }

    return { message: "Appointment status updated successfully", appointment };
  } catch (error) {
    return { message: "Error updating appointment status", error };
  }
}


// Function to get all appointments
const getAllAppointments = async (req,res)=> {
    try {
      // Fetch all appointments from the database
      const appointments = await Appointment.find()
        .populate('doctor', 'name specialty') // Populating the doctor data (name and specialty)
        .sort({ createdAt: -1 }); // Sort by creation date (most recent first)
  
      if (!appointments.length) {
        return { message: 'No appointments found' };
      }
  
      return { message: 'Appointments retrieved successfully', appointments };
    } catch (error) {
      return { message: 'Error retrieving appointments', error };
    }
  }

module.exports = {
  createAppointment,
  updateAppointmentStatus,
  getAllAppointments
};