"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Validation schema using zod
const categorySchema = z.object({
  name: z.string().nonempty("Category name is required"),
  status: z.string().nonempty("Description is required"),
});

export const CategoryForm = ({ defaultValues = {}, onClose }) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultValues.name || "",
      status: defaultValues.status || "",
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
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="InActive">In Active</SelectItem>
                </SelectContent>
              </Select>
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
