import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { format } from "date-fns";

const TaskModal = ({ isOpen, onClose, task, onSave, projects, teammates }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    assigneeId: "",
    dueDate: "",
    priority: "Medium",
    status: "To Do"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        projectId: task.projectId || "",
        assigneeId: task.assigneeId || "",
        dueDate: task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : "",
        priority: task.priority || "Medium",
        status: task.status || "To Do"
      });
    } else {
      setFormData({
        title: "",
        description: "",
        projectId: "",
        assigneeId: "",
        dueDate: "",
        priority: "Medium",
        status: "To Do"
      });
    }
    setErrors({});
  }, [task, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.projectId) newErrors.projectId = "Project is required";
    if (!formData.assigneeId) newErrors.assigneeId = "Assignee is required";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const taskData = {
      ...formData,
      dueDate: new Date(formData.dueDate),
      updatedAt: new Date()
    };

    if (!task) {
      taskData.createdAt = new Date();
    }

    onSave(taskData);
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl shadow-elevation-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {task ? "Edit Task" : "Create New Task"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ApperIcon name="X" size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Title */}
                  <Input
                    label="Task Title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    error={errors.title}
                    placeholder="Enter task title..."
                  />

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      placeholder="Enter task description..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Project and Assignee */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Project"
                      value={formData.projectId}
                      onChange={(e) => handleChange("projectId", e.target.value)}
                      error={errors.projectId}
                    >
                      <option value="">Select project...</option>
                      {projects.map(project => (
                        <option key={project.Id} value={project.Id}>
                          {project.name}
                        </option>
                      ))}
                    </Select>

                    <Select
                      label="Assignee"
                      value={formData.assigneeId}
                      onChange={(e) => handleChange("assigneeId", e.target.value)}
                      error={errors.assigneeId}
                    >
                      <option value="">Select assignee...</option>
                      {teammates.map(member => (
                        <option key={member.Id} value={member.Id}>
                          {member.name}
                        </option>
                      ))}
                    </Select>
                  </div>

                  {/* Due Date, Priority, Status */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input
                      label="Due Date"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleChange("dueDate", e.target.value)}
                      error={errors.dueDate}
                    />

                    <Select
                      label="Priority"
                      value={formData.priority}
                      onChange={(e) => handleChange("priority", e.target.value)}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </Select>

                    <Select
                      label="Status"
                      value={formData.status}
                      onChange={(e) => handleChange("status", e.target.value)}
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Review">Review</option>
                      <option value="Done">Done</option>
                    </Select>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <Button variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {task ? "Update Task" : "Create Task"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;