const Test = require("../../Models/Test.model");

// Create a new test
const createBloodTest = async (req, res) => {
  try {
    const {
      name,
      description,
      testPreparation,
      parameterTested,
      turnaroundTime,
      price,
    } = req.body;
    const newTest = new Test({
      name,
      category: "Blood",
      description,
      testPreparation,
      parameterTested,
      turnaroundTime,
      price,
    });
    await newTest.save();
    res
      .status(201)
      .json({ message: "Test created successfully", test: newTest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a test
const updateBloodTest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body; // Make sure the data includes arrays for 'testPreparation' and 'parameterTested'
    const test = await Test.findByIdAndUpdate(id, updatedData, { new: true });
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test updated successfully", test });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a test
const deleteBloodTest = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findByIdAndDelete(id);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getBloodTest = async (req, res) => {
  try {
    const test = await Test.find({ category: "Blood" });
    res.status(200).json({ message: "Test fetched successfully", test });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createBloodTest,
  updateBloodTest,
  deleteBloodTest,
  getBloodTest,
};
