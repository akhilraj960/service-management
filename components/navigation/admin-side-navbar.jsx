"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

export const AdminSideNavbar = () => {
  return (
    <div className="h-[calc(100vh-80px)] w-1/6 bg-blue-50 flex flex-col">
      <Link
        href={"/admin/service-man"}
        className={cn(
          buttonVariants({ variant: "", className: "rounded-none" })
        )}
      >
        Service Man
      </Link>
      <Link
        href={"/admin/service-view"}
        className={cn(
          buttonVariants({ variant: "", className: "rounded-none" })
        )}
      >
        Service View
      </Link>
      <Link
        href={"/admin/category"}
        className={cn(
          buttonVariants({ variant: "", className: "rounded-none" })
        )}
      >
        Category
      </Link>
    </div>
  );
};
