"use client";

import { useEffect, useState } from "react";
import { CategoryForm } from "@/components/forms/category-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wrapper } from "@/components/wrapper";
import axios from "axios";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category");
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Failed to fetch categories. Please try again.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form submission to create or update a category
  const handleFormSubmit = async (categoryData) => {
    try {
      if (editCategory) {
        // Update category
        const response = await axios.put(
          `/category/${editCategory._id}`,
          categoryData
        );
        setCategories((prev) =>
          prev.map((cat) =>
            cat._id === editCategory._id ? response.data : cat
          )
        );
      } else {
        // Create new category
        const response = await axios.post("/api/category", categoryData);
        setCategories((prev) => [...prev, response.data]);
      }

      setEditCategory(null); // Close dialog and reset edit state
    } catch (error) {
      console.error(
        `Error ${editCategory ? "updating" : "creating"} category:`,
        error
      );
      alert("An error occurred while saving the category. Please try again.");
    }
  };

  // Handle category deletion
  const handleDeleteCategory = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete("/api/category", { data: { id } });
      setCategories((prev) => prev.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete the category. Please try again.");
    }
  };

  return (
    <Wrapper>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Categories</CardTitle>
          <Dialog onOpenChange={() => setEditCategory(null)}>
            <DialogTrigger asChild>
              <Button>Add Category</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editCategory ? "Edit Category" : "New Category"}
                </DialogTitle>
              </DialogHeader>
              <CategoryForm
                defaultValues={editCategory || {}}
                onSubmit={handleFormSubmit}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead>Category Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <TableRow key={category._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.status}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Edit</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Status</DialogTitle>
                            <DialogDescription></DialogDescription>
                          </DialogHeader>
                          <CategoryForm defaultValues={category} />
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No categories available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Wrapper>
  );
}
