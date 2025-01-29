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

router.post("/add-new", accessControl(["admin"]), createBlog);
router.patch("/update/:id", accessControl(["admin"]), updateBlog);
router.delete("/delete/:id", accessControl(["admin"]), deleteBlog);
router.get("/get-all", getAllBlogs);
router.get("/get-by-id/:id", getBlogById);

module.exports = router;
