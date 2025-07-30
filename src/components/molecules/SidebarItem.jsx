import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SidebarItem = ({ to, icon, children, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-700 group",
          isActive && "bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 border-l-4 border-primary-500",
          className
        )
      }
    >
      <ApperIcon 
        name={icon} 
        size={20} 
        className="mr-3 transition-colors duration-200" 
      />
      <span className="font-medium">{children}</span>
    </NavLink>
  );
};

export default SidebarItem;