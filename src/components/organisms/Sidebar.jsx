import React from "react";
import SidebarItem from "@/components/molecules/SidebarItem";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = () => {
  return (
    <div className="w-60 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-2 rounded-lg mr-3">
            <ApperIcon name="Layers" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              FlowBoard
            </h1>
            <p className="text-xs text-gray-500">Team Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <SidebarItem to="/" icon="CheckSquare">
          Tasks
        </SidebarItem>
        <SidebarItem to="/projects" icon="Folder">
          Projects
        </SidebarItem>
        <SidebarItem to="/calendar" icon="Calendar">
          Calendar
        </SidebarItem>
        <SidebarItem to="/team" icon="Users">
          Team
        </SidebarItem>
        <SidebarItem to="/dashboard" icon="BarChart3">
          Dashboard
        </SidebarItem>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center mr-3">
            <span className="text-sm font-semibold text-white">JD</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">Project Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;