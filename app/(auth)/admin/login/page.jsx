"use client";

import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

// Define the form validation schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const loginStatus = localStorage.getItem("loginStatus");
    if (loginStatus === "loggedIn") {
      setSuccess(true);
      router.push("/admin");
    }
  }, [router]);

  const onSubmit = async (data) => {
    setError(""); // Clear any previous error
    try {
      // Use axios instead of fetch
      const response = await axios.post("/api/auth/admin-login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check for successful response
      if (response.status === 200) {
        // Set login status in localStorage
        localStorage.setItem("loginStatus", "loggedIn");
        setSuccess(true);
        console.log("Login successful");
      }
    } catch (err) {
      // Handle any errors that occurred during the request
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <main className="h-screen w-full flex justify-center items-center">
      <Card className="w-[400px] p-6">
        <CardHeader>
          <CardTitle className="text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <p className="text-green-500 text-sm text-center">
              You are already logged in!
            </p>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
          )}
        </CardContent>
      </Card>
    </main>
  );
}
