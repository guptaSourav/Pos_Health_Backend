const HealthRisk = require("../../Models/HealthRisk");
// const Test = require("../../Models/Test");

// Create a new Health Risk
const createHealthRisk = async (req, res) => {
  try {
    const { categoryName, description, tests } = req.body;

    console.log("test id's : ",tests);

    const healthRisk = new HealthRisk({
      categoryName,
      description,
      tests: tests, // Array of Test ObjectIds
    });

    console.log("healthRisk : ",healthRisk);

    await healthRisk.save();
    res.status(201).json({ message: "Health risk created successfully", healthRisk });
  } catch (error) {
    res.status(500).json({ message: "Error creating health risk", error });
  }
};

// Get all Health Risks
const getAllHealthRisks = async (req, res) => {
  try {
    const healthRisks = await HealthRisk.find().populate("tests");
    // console.log("health risks : ",healthRisks);
    res.status(200).json(healthRisks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching health risks", error });
  }
};

// Get a single Health Risk by ID
const getHealthRiskById = async (req, res) => {
  try {
    const { id } = req.params;
    const healthRisk = await HealthRisk.findById(id).populate({
        path: "tests",
        select: "-__v", // Exclude version field or specify required fields
      });

      console.log("health risk data :")
    if (!healthRisk) {
      return res.status(404).json({ message: "Health risk not found" });
    }

    res.status(200).json(healthRisk);
  } catch (error) {
    res.status(500).json({ message: "Error fetching health risk", error });
  }
};

// Update a Health Risk
const updateHealthRisk = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, description, tests } = req.body;

    const healthRisk = await HealthRisk.findByIdAndUpdate(
      id,
      { categoryName, description, tests: tests },
      { new: true }
    );

    if (!healthRisk) {
      return res.status(404).json({ message: "Health risk not found" });
    }

    res.status(200).json({ message: "Health risk updated successfully", healthRisk });
  } catch (error) {
    res.status(500).json({ message: "Error updating health risk", error });
  }
};

// Delete a Health Risk
const deleteHealthRisk = async (req, res) => {
  try {
    const { id } = req.params;

    const healthRisk = await HealthRisk.findByIdAndDelete(id);

    if (!healthRisk) {
      return res.status(404).json({ message: "Health risk not found" });
    }

    res.status(200).json({ message: "Health risk deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting health risk", error });
  }
};

module.exports = {
  createHealthRisk,
  getAllHealthRisks,
  getHealthRiskById,
  updateHealthRisk,
  deleteHealthRisk,
};
