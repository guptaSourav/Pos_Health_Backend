const Banner = require("../../Models/Banner");

const createBanner = async (req, res) => {
  try {
    const { title, imgUrl, description, link } = req.body;

    if (!title || !imgUrl) {
      res.send(400).json({
        status: 400,
        message: "Please provide all the required fields",
      });
    }

    const banner = new Banner({
      title,
      imgUrl,
      description: description || "",
      link: link || "",
    });

    await banner.save();

    res.status(201).json({
      status: 201,
      message: "Banner created successfully",
      data: banner,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const updateBanner = async (req, res) => {
  try {
    const { updatedBanner } = req.body;
    const { id } = req.params;

    const banner = await Banner.findByIdAndUpdate(id, updatedBanner, {
      new: true,
    });

    res.status(200).json({
      status: 200,
      message: "Banner updated successfully",
      data: banner,
    });
  } catch (err) {
    res.send(500).json({ status: 500, message: err.message });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    await Banner.findByIdAndDelete(id);

    res.status(200).json({
      status: 200,
      message: "Banner deleted successfully",
    });
  } catch (err) {
    res.send(500).json({ status: 500, message: err.message });
  }
};

const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();

    res.status(200).json({
      status: 200,
      data: banners,
    });
  } catch (err) {
    res.send(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  createBanner,
  updateBanner,
  deleteBanner,
  getBanners,
};
