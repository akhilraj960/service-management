"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

// Validation schema using zod
const categorySchema = z.object({
  name: z.string().nonempty("Category name is required"),
  description: z.string().nonempty("Description is required"),
});

export const CategoryForm = ({ defaultValues = {}, onClose }) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValues.name || "",
      description: defaultValues.description || "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      if (defaultValues._id) {
        // Update existing category
        await axios
          .put(`/category/${defaultValues._id}`, data)
          .then((res) => window.location.reload());
      } else {
        // Create a new category
        await axios.post("/api/category", data);
      }

      onClose?.(); // Close the modal if onClose is provided
      router.refresh(); // Refresh data without a full page reload
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving the category. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Category Name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Input
                  id="description"
                  placeholder="Enter category description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4">
          <Button type="submit" className="w-full">
            {defaultValues._id ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
