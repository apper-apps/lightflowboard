import React from "react";
import { cn } from "@/utils/cn";

const Badge = ({ children, variant = "default", className, ...props }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800",
    accent: "bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800",
    success: "bg-gradient-to-r from-green-100 to-green-200 text-green-800",
    warning: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800",
    error: "bg-gradient-to-r from-red-100 to-red-200 text-red-800",
    todo: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700",
    inprogress: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700",
    review: "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700",
    done: "bg-gradient-to-r from-green-100 to-green-200 text-green-700"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;