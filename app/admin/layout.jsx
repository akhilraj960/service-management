"use client";

import { useEffect } from "react";
import { AdminNavbar } from "@/components/navigation/admin-navbar";
import { AdminSideNavbar } from "@/components/navigation/admin-side-navbar";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Check login status in localStorage
    const loginStatus = localStorage.getItem("loginStatus");
    if (loginStatus !== "loggedIn") {
      // Redirect to admin login if not logged in
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="flex flex-col">
      <AdminNavbar />
      <div className="flex">
        <AdminSideNavbar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
