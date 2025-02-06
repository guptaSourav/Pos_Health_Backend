const Blog = require("../../Models/Blog"); // Adjust the path based on your project structure

// Create Blog
const createBlog = async (req, res) => {
  try {
    const { title, category, content, author, imgUrl, imgWidth, imgHeight,tags, status, summary,publishedDate } =
      req.body;

    if (!title || !category || !content || !author || !imgUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Set default width and height if 0 or not provided
    const width = imgWidth && imgWidth > 0 ? imgWidth : 800;
    const height = imgHeight && imgHeight > 0 ? imgHeight : 600;

    const newBlog = new Blog({
      title,
      category,
      content,
      author,
      imgUrl,
      imgWidth: width,
      imgHeight: height,
      publishedDate,
      status: status || "draft",
      summary: summary || "",
      tags: tags && tags.length > 0 ? tags : [],
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Blog by ID
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, content, author, imgUrl, imgWidth, imgHeight,tags, status, summary,publishedDate  } =
      req.body;

    if (!title || !category || !content || !author || !imgUrl || !publishedDate || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Set default width and height if 0 or not provided
    const width = imgWidth && imgWidth > 0 ? imgWidth : 800;
    const height = imgHeight && imgHeight > 0 ? imgHeight : 600;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        category,
        content,
        author,
        imgUrl,
        imgWidth: width,
        imgHeight: height,
        publishedDate,
        status,
        summary: summary || "",
        tags: tags && tags.length > 0 ? tags : [],
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Blog by ID
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true });
    res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUnpublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: false });
    res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getPublishedBlogs,
  getUnpublishedBlogs,
};
