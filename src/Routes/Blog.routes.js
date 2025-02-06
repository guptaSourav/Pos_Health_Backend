const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getPublishedBlogs,
  getUnpublishedBlogs,
  publishedBlog,
  unpublishedBlog
} = require("../Controllers/Blog/Blog.controller");
const accessControl = require("../Middleware/AccessControle.middleware");

const express = require("express");

const router = express.Router();

router.post("/add-new", createBlog);
router.patch("/update/:id",  updateBlog);
router.delete("/delete/:id",  deleteBlog);
router.get("/get-all", getAllBlogs);
router.get("/get-by-id/:id", getBlogById);
router.get("/get-published", getPublishedBlogs);
router.get("/get-unpublished", getUnpublishedBlogs);
router.patch("/publish/:id", publishedBlog);
router.patch("/unpublish/:id", unpublishedBlog);



module.exports = router;
