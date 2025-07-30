import React from "react";
import { cn } from "@/utils/cn";

const FilterButton = ({ children, active, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105",
        active 
          ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-elevation-2" 
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-elevation-1",
        className
      )}
    >
      {children}
    </button>
  );
};

export default FilterButton;