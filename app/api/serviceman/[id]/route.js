import connectToDatabase from "@/lib/db";
import ServiceMan from "@/lib/models/ServiceMan";

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Service man ID is required" }),
        { status: 400 }
      );
    }

    const deletedServiceMan = await ServiceMan.findByIdAndDelete(id);

    if (!deletedServiceMan) {
      return new Response(JSON.stringify({ error: "Service man not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Service man deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting service man:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Service man ID is required" }),
        { status: 400 }
      );
    }

    const body = await req.json();
    const { name, email, phone, age, gender, category } = body;

    // Validate all required fields
    if (!name || !email || !phone || !age || !gender || !category) {
      return new Response(
        JSON.stringify({
          error:
            "All fields (name, email, phone, age, gender, category) are required.",
        }),
        { status: 400 }
      );
    }

    // Update the service man
    const updatedServiceMan = await ServiceMan.findByIdAndUpdate(
      id,
      { name, email, phone, age, gender, category },
      { new: true, runValidators: true }
    );

    if (!updatedServiceMan) {
      return new Response(JSON.stringify({ error: "Service man not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedServiceMan), { status: 200 });
  } catch (error) {
    console.error("Error updating service man:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
