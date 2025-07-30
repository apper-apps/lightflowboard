import tasksData from '@/services/mockData/tasks.json';

let tasks = [...tasksData];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllTasks = async () => {
  await delay(500);
  return [...tasks];
};

export const getTaskById = async (id) => {
  await delay(200);
  const task = tasks.find(t => t.Id === id);
  if (!task) {
    throw new Error('Task not found');
  }
  return { ...task };
};

export const createTask = async (taskData) => {
  await delay(300);
  const newTask = {
    ...taskData,
    Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tasks.push(newTask);
  return { ...newTask };
};

export const updateTask = async (id, taskData) => {
  await delay(300);
  const index = tasks.findIndex(t => t.Id === id);
  if (index === -1) {
    throw new Error('Task not found');
  }
  
  tasks[index] = {
    ...tasks[index],
    ...taskData,
    Id: id, // Ensure ID doesn't change
    updatedAt: new Date().toISOString()
  };
  
  return { ...tasks[index] };
};

export const deleteTask = async (id) => {
  await delay(200);
  const index = tasks.findIndex(t => t.Id === id);
  if (index === -1) {
    throw new Error('Task not found');
  }
  
  tasks.splice(index, 1);
  return true;
};

export const reorderTasks = async (reorderedTasks) => {
  await delay(300);
  // Update the tasks array with the new order
  tasks = [...reorderedTasks];
  return true;
};