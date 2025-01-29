const HealthPackage = require("../../Models/HealthPackage"); // HealthPackage model
const mongoose = require("mongoose");

// Create Health Package
const createHealthPackage = async (req, res) => {
  try {
    const { packageName, description, price, includeTests, imgUrl } = req.body;

    // Check if packageName already exists
    const existingPackage = await HealthPackage.findOne({ packageName });
    if (existingPackage) {
      return res.status(400).json({ message: "Health package already exists" });
    }

    // Create new health package
    const newHealthPackage = new HealthPackage({
      packageName,
      description,
      price,
      includeTests,
      imgUrl,
    });

    await newHealthPackage.save();

    res.status(201).json({ message: "Health package created successfully", newHealthPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Health Packages
const getAllHealthPackages = async (req, res) => {
  try {
    const healthPackages = await HealthPackage.find().populate('includeTests');
    res.status(200).json(healthPackages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Single Health Package
const getHealthPackageById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid health package ID" });
    }

    const healthPackage = await HealthPackage.findById(id).populate('includeTests');
    if (!healthPackage) {
      return res.status(404).json({ message: "Health package not found" });
    }

    res.status(200).json(healthPackage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Health Package
const updateHealthPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { packageName, description, price, includeTests, imgUrl } = req.body;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid health package ID" });
    }

    const updatedHealthPackage = await HealthPackage.findByIdAndUpdate(
      id,
      { packageName, description, price, includeTests, imgUrl },
      { new: true }
    );

    if (!updatedHealthPackage) {
      return res.status(404).json({ message: "Health package not found" });
    }

    res.status(200).json({ message: "Health package updated successfully", updatedHealthPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Health Package
const deleteHealthPackage = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid health package ID" });
    }

    const deletedHealthPackage = await HealthPackage.findByIdAndDelete(id);
    if (!deletedHealthPackage) {
      return res.status(404).json({ message: "Health package not found" });
    }

    res.status(200).json({ message: "Health package deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createHealthPackage,
  getAllHealthPackages,
  getHealthPackageById,
  updateHealthPackage,
  deleteHealthPackage,
};
