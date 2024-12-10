import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const { email, password } = body;

    // Connect to the database
    await connectToDatabase();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare the provided password with the stored password
    if (user.password !== password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // If successful, return a success message
    return NextResponse.json(
      { message: "Login successful", userId: user._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in login API:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
