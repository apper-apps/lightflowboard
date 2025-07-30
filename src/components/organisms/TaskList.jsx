import React, { useState } from "react";
import { motion } from "framer-motion";
import { format, isAfter, isToday, isThisWeek } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FilterButton from "@/components/molecules/FilterButton";
import StatusBadge from "@/components/molecules/StatusBadge";
import TaskModal from "@/components/organisms/TaskModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const TaskList = ({ 
  tasks = [], 
  projects = [], 
  teammates = [], 
  loading, 
  error, 
  onRetry,
  onCreateTask,
  onUpdateTask,
  onDeleteTask 
}) => {
  const [filter, setFilter] = useState("My Tasks");
  const [sortField, setSortField] = useState("dueDate");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const filters = [
    { key: "All Tasks", label: "All Tasks" },
    { key: "My Tasks", label: "My Tasks" },
    { key: "Overdue", label: "Overdue" },
    { key: "This Week", label: "This Week" }
  ];

  const getFilteredTasks = () => {
    let filtered = [...tasks];

    switch (filter) {
      case "My Tasks":
        // For demo, showing all tasks as "My Tasks"
        break;
      case "Overdue":
        filtered = filtered.filter(task => 
          task.dueDate && isAfter(new Date(), new Date(task.dueDate)) && task.status !== "Done"
        );
        break;
      case "This Week":
        filtered = filtered.filter(task => 
          task.dueDate && (isToday(new Date(task.dueDate)) || isThisWeek(new Date(task.dueDate)))
        );
        break;
      default:
        break;
    }

    // Sort tasks
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "dueDate") {
        aValue = aValue ? new Date(aValue) : new Date("2099-12-31");
        bValue = bValue ? new Date(bValue) : new Date("2099-12-31");
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (selectedTask) {
      onUpdateTask(selectedTask.Id, taskData);
    } else {
      onCreateTask(taskData);
    }
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.Id === parseInt(projectId));
    return project ? project.name : "No Project";
  };

  const getAssigneeName = (assigneeId) => {
    const assignee = teammates.find(t => t.Id === parseInt(assigneeId));
    return assignee ? assignee.name : "Unassigned";
  };

  const isOverdue = (dueDate, status) => {
    return dueDate && isAfter(new Date(), new Date(dueDate)) && status !== "Done";
  };

  const filteredTasks = getFilteredTasks();

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={onRetry} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your team's work
          </p>
        </div>
        <Button onClick={handleCreateTask}>
          <ApperIcon name="Plus" size={16} className="mr-2" />
          New Task
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {filters.map(({ key, label }) => (
          <FilterButton
            key={key}
            active={filter === key}
            onClick={() => setFilter(key)}
          >
            {label}
          </FilterButton>
        ))}
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <Empty
          title="No tasks found"
          description={
            filter === "All Tasks" 
              ? "Create your first task to get started with project management."
              : `No tasks match the "${filter}" filter. Try a different filter or create a new task.`
          }
          icon="CheckSquare"
          actionLabel="Create Task"
          onAction={handleCreateTask}
        />
      ) : (
        <div className="bg-white rounded-xl shadow-elevation-2 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 bg-gray-50">
            {[
              { key: "title", label: "Task" },
              { key: "projectId", label: "Project" },
              { key: "assigneeId", label: "Assignee" },
              { key: "dueDate", label: "Due Date" },
              { key: "status", label: "Status" }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleSort(key)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors text-left"
              >
                {label}
                <ApperIcon 
                  name={
                    sortField === key 
                      ? sortDirection === "asc" ? "ChevronUp" : "ChevronDown"
                      : "ChevronsUpDown"
                  } 
                  size={14} 
                  className="text-gray-400"
                />
              </button>
            ))}
          </div>

          {/* Task Rows */}
          <div className="divide-y divide-gray-100">
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-5 gap-4 p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-primary-50/30 transition-all duration-200 cursor-pointer group"
                onClick={() => handleEditTask(task)}
              >
                {/* Task Title */}
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 group-hover:text-primary-700 transition-colors">
                      {task.title}
                    </span>
                    {task.description && (
                      <span className="text-sm text-gray-500 truncate max-w-[200px]">
                        {task.description}
                      </span>
                    )}
                  </div>
                </div>

                {/* Project */}
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">
                    {getProjectName(task.projectId)}
                  </span>
                </div>

                {/* Assignee */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-white">
                      {getAssigneeName(task.assigneeId).charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {getAssigneeName(task.assigneeId)}
                  </span>
                </div>

                {/* Due Date */}
                <div className="flex items-center">
                  <span className={`text-sm ${
                    isOverdue(task.dueDate, task.status) 
                      ? "text-error font-medium" 
                      : "text-gray-600"
                  }`}>
                    {task.dueDate ? format(new Date(task.dueDate), "MMM dd, yyyy") : "No due date"}
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <StatusBadge status={task.status} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onSave={handleSaveTask}
        projects={projects}
        teammates={teammates}
      />
    </div>
  );
};

export default TaskList;