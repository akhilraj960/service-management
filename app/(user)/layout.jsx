"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const loginStatus = localStorage.getItem("userLoggedIn");

    // If not logged in, redirect to login page
    if (loginStatus !== "true") {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
}
