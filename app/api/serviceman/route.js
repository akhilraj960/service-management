import connectToDatabase from "@/lib/db";
import ServiceMan from "@/lib/models/ServiceMan";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDatabase(); // Ensure the database is connected
    const body = await req.json(); // Parse the incoming JSON data

    // Create a new serviceman using the request body
    const newServiceMan = await ServiceMan.create(body);

    // Return the created serviceman with a 201 status
    return NextResponse.json(newServiceMan, { status: 201 });
  } catch (error) {
    console.error("Error creating serviceman:", error);

    // Return an error response with appropriate status
    return NextResponse.json(
      { error: "Failed to create serviceman", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase(); // Ensure the database is connected

    // Fetch all servicemen from the database
    const servicemen = await ServiceMan.find();

    // Return the list of servicemen with a 200 status
    return NextResponse.json(servicemen, { status: 200 });
  } catch (error) {
    console.error("Error fetching servicemen:", error);

    // Return an error response with appropriate status
    return NextResponse.json(
      { error: "Failed to fetch servicemen", details: error.message },
      { status: 500 }
    );
  }
}
