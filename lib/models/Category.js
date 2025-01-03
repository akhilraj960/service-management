const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

module.exports = Category;
