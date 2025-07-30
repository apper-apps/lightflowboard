import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TaskList from "@/components/organisms/TaskList";
import * as taskService from "@/services/api/taskService";
import * as projectService from "@/services/api/projectService";
import * as teamService from "@/services/api/teamService";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teammates, setTeammates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [tasksData, projectsData, teammatesData] = await Promise.all([
        taskService.getAllTasks(),
        projectService.getAllProjects(),
        teamService.getAllTeammates()
      ]);
      
      setTasks(tasksData);
      setProjects(projectsData);
      setTeammates(teammatesData);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      toast.success("Task created successfully!");
    } catch (err) {
      toast.error("Failed to create task");
      console.error("Error creating task:", err);
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, taskData);
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ));
      toast.success("Task updated successfully!");
    } catch (err) {
      toast.error("Failed to update task");
      console.error("Error updating task:", err);
    }
  };
const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", err);
    }
  };

  const handleReorderTasks = async (reorderedTasks) => {
    try {
      setTasks(reorderedTasks);
      await taskService.reorderTasks(reorderedTasks);
      toast.success("Tasks reordered successfully!");
    } catch (err) {
      toast.error("Failed to reorder tasks");
      console.error("Error reordering tasks:", err);
    }
  };
  return (
<TaskList
      tasks={tasks}
      projects={projects}
      teammates={teammates}
      loading={loading}
      error={error}
      onRetry={loadData}
      onCreateTask={handleCreateTask}
      onUpdateTask={handleUpdateTask}
      onDeleteTask={handleDeleteTask}
      onReorderTasks={handleReorderTasks}
    />
  );
};

export default Tasks;