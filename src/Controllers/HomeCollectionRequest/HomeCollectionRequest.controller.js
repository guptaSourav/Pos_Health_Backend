const HomeCollectionRequest = require("../../Models/HomeCollectionRequest");
const validator = require("validator");

// Create Home Collection Request
const createRequest = async (req, res) => {
  try {
    const {
      fullName,
      mobileNumber,
      address,
      city,
      pinCode,
      preferredDate,
      preferredTime,
    } = req.body;

    // Validate required fields
    if (!fullName || fullName.trim().length === 0) {
      return res.status(400).json({ message: "Full name is required" });
    }
    if (
      !mobileNumber ||
      !validator.isMobilePhone(mobileNumber) ||
      mobileNumber.length !== 10
    ) {
      return res
        .status(400)
        .json({ message: "Invalid mobile number, must be 10 digits" });
    }
    if (!address || address.trim().length === 0) {
      return res.status(400).json({ message: "Address is required" });
    }
    if (!city || city.trim().length === 0) {
      return res.status(400).json({ message: "City is required" });
    }
    if (!pinCode || !validator.isPostalCode(pinCode, "any")) {
      return res.status(400).json({ message: "Invalid pin code" });
    }
    if (!preferredDate) {
      return res.status(400).json({ message: "Invalid preferred date" });
    }

    // const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    // Validate preferred time format (HH:mm)
    if (!preferredTime) {
      return res
        .status(400)
        .json({
          message: "Invalid preferred time, must be in a valid time format",
        });
    }

    // Create new home collection request
    const newRequest = new HomeCollectionRequest({
      fullName,
      mobileNumber,
      address,
      city,
      pinCode,
      preferredDate,
      preferredTime,
    });

    // Save the request to the database
    await newRequest.save();
    res.status(201).json({
      message: "Home collection request created successfully",
      newRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Home Collection Requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await HomeCollectionRequest.find();
    
    res.status(200).json({data:requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Home Collection Request by ID
const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await HomeCollectionRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Home Collection Request by ID (Change Status)
const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (
      ![
        "call_done",
        "follow_up",
        "deal_closed",
        "not_intrested",
        "pending",
      ].includes(status)
    ) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Find and update the request by ID
    const updatedRequest = await HomeCollectionRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res
      .status(200)
      .json({ message: "Request updated successfully", updatedRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Home Collection Request by ID
const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the request by ID
    const deletedRequest = await HomeCollectionRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
