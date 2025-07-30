import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarItem from "@/components/molecules/SidebarItem";
import ApperIcon from "@/components/ApperIcon";

const MobileSidebar = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
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
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ApperIcon name="X" size={20} className="text-gray-500" />
              </button>
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;