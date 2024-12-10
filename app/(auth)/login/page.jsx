"use client";

import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Define the form validation schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function AdminLogin() {
  const [error, setError] = useState("");
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem("userLoggedIn");
    if (isLoggedIn === "true") {
      router.push("/"); // Redirect to the admin page if already logged in
    }
  }, [router]);

  const onSubmit = async (data) => {
    setError(""); // Clear any previous error
    try {
      const response = await axios.post("/api/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        localStorage.setItem("userLoggedIn", "true"); // Mark as logged in
        router.push("/"); // Redirect to the admin dashboard
      }
    } catch (err) {
      // Handle errors from the API response
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      setError(errorMessage);
    }
  };

  return (
    <main className="h-screen w-full flex justify-center items-center">
      <Card className="w-[400px] p-6">
        <CardHeader>
          <CardTitle className="text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
          <Link
            href={"/register"}
            className={cn(
              buttonVariants({
                variant: "link",
                className: "text-center mt-6 w-full",
              })
            )}
          >
            Don’t have an account? Register
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
