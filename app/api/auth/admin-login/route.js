import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Perform basic validation (adjust based on your requirements)
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required", success: false },
        { status: 400 }
      );
    }

    // Replace the following with your own logic (e.g., checking credentials)
    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "admin@admin";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "Login successful", success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid email or password", success: false },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error processing login request:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
