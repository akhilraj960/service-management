import mongoose from "mongoose";

const serviceManSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minlength: [10, "Phone number must be at least 10 characters"],
      maxlength: [15, "Phone number cannot exceed 15 characters"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "Age must be at least 18"],
      max: [65, "Age cannot exceed 65"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "Other"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const ServiceMan =
  mongoose.models.ServiceMan || mongoose.model("ServiceMan", serviceManSchema);

export default ServiceMan;
