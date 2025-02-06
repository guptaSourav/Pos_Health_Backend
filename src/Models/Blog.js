const mongoose = require("mongoose");

// Define the blog schema
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Health Tips', 'Medical News', 'Wellness Articles', 'Diet & Nutrition'], // Example categories
    },
    content: { type: String, required: true },
    author: { type: String, required: true },
    imgUrl: { type: String, required: true },
    imgWidth: { type: Number },
    imgHeight: { type: Number },
    publishedDate: { type: String },
    tags: { type: [String], default: [] },
    status: {
      type: String,
      required: true,
      enum: ["draft", "published"],
      default: "draft",
  },
  summary: { type: String},
},
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
