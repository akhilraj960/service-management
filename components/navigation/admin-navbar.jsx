import React from "react";
import { Button } from "../ui/button";

export const AdminNavbar = () => {
  const handleLogout = () => {
    localStorage.clear("loginStatus");
    window.location.reload();
  };

  return (
    <header className="h-20 border-b px-20 flex justify-between items-center">
      <h2 className="font-semibold text-2xl uppercase">Admin DashBoard</h2>
      <div>
        <Button onClick={() => handleLogout()} variant="destructive">
          Logout
        </Button>
      </div>
    </header>
  );
};
