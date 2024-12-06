import connectToDatabase from "@/lib/db";
import Category from "@/lib/models/Category";

export async function GET(req) {
  try {
    await connectToDatabase();
    const categories = await Category.find();
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, description } = body;

    if (!name || !description) {
      return new Response(
        JSON.stringify({ error: "Name and description are required" }),
        { status: 400 }
      );
    }

    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();
    return new Response(JSON.stringify(savedCategory), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, name, description } = body;

    if (!id || !name || !description) {
      return new Response(
        JSON.stringify({ error: "ID, name, and description are required" }),
        { status: 400 }
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedCategory), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Category deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
