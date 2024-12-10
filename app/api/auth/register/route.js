import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const {
      email,
      password,
      confirmPassword,
      phone1,
      phone2,
      location,
      age,
      gender,
    } = body;

    // Connect to the database
    await connectToDatabase();

    // Validate required fields
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !phone1 ||
      !location ||
      !age ||
      !gender
    ) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Create a new user (password is not hashed here)
    const newUser = new User({
      email,
      password, // Storing plain text password (not recommended)
      phone1,
      phone2,
      location,
      age,
      gender,
    });

    // Save the user to the database
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in register API:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
