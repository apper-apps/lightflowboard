// Import mock data
import tasksData from "@/services/mockData/tasks.json";

// In-memory storage for development
let tasks = [...tasksData];

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllTasks = async () => {
  await delay(300);
  return [...tasks];
};

export const getTaskById = async (id) => {
  await delay(200);
  const task = tasks.find(task => task.Id === parseInt(id));
  if (!task) {
    throw new Error("Task not found");
  }
  return { ...task };
};

export const createTask = async (taskData) => {
  await delay(400);
  
  // Find the highest existing Id and add 1
  const maxId = tasks.length > 0 ? Math.max(...tasks.map(task => task.Id)) : 0;
  
  const newTask = {
    Id: maxId + 1,
    ...taskData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  tasks.push(newTask);
  return { ...newTask };
};

export const updateTask = async (id, taskData) => {
  await delay(300);
  
  const taskIndex = tasks.findIndex(task => task.Id === parseInt(id));
  if (taskIndex === -1) {
    throw new Error("Task not found");
  }
  
  const updatedTask = {
    ...tasks[taskIndex],
    ...taskData,
    updatedAt: new Date()
  };
  
  tasks[taskIndex] = updatedTask;
  return { ...updatedTask };
};

export const deleteTask = async (id) => {
  await delay(250);
  
  const taskIndex = tasks.findIndex(task => task.Id === parseInt(id));
  if (taskIndex === -1) {
    throw new Error("Task not found");
  }
  
  tasks.splice(taskIndex, 1);
  return true;
};