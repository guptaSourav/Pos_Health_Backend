const Test = require("../../Models/Test.model");

const getPopularTests = async (req, res) => {
  try {
    const tests = await Test.find({ published: true })
      .sort({ bookingsCount: -1 })
      .select("-published -bookingsCount");

    res.status(200).json({ tests });
  } catch (error) {
    console.error("Error fetching popular tests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllTest = async (req, res) => {
  try {
    const tests = await Test.find({ published: true }).select('name _id');

    res.status(200).json({ tests });
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = { getPopularTests, getAllTest };
