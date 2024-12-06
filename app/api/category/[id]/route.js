import connectToDatabase from "@/lib/db";
import Category from "@/lib/models/Category";

export async function PUT(req, { params }) {
  try {
    // Connect to the database
    await connectToDatabase();


    // Parse request body and parameters
    const body = await req.json();
    const { name, description } = body;
    const { id } = params;

    // Validate required fields
    if (!id || !name || !description) {
      return new Response(
        JSON.stringify({ error: "ID, name, and description are required" }),
        { status: 400 }
      );
    }

    // Attempt to update the category
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true } // Return the updated document
    );

    // Check if the category exists
    if (!updatedCategory) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
      });
    }

    // Return the updated category
    return new Response(JSON.stringify(updatedCategory), { status: 200 });
  } catch (error) {
    // Handle unexpected errors
    console.error("Error updating category:", error.message);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
