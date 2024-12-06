import React from "react";

export const Wrapper = ({ children }) => {
  return <div className="h-[calc(100vh-80px)] w-full p-4">{children}</div>;
};
