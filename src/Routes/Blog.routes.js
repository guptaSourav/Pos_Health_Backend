const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../Controllers/Blog/Blog.controller");
const accessControl = require("../Middleware/AccessControle.middleware");

const express = require("express");

const router = express.Router();

router.post("/add-new", createBlog);
router.patch("/update/:id",  updateBlog);
router.delete("/delete/:id",  deleteBlog);
router.get("/get-all", getAllBlogs);
router.get("/get-by-id/:id", getBlogById);

module.exports = router;
