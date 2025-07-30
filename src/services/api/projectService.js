// Import mock data
import projectsData from "@/services/mockData/projects.json";

// In-memory storage for development
let projects = [...projectsData];

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllProjects = async () => {
  await delay(200);
  return [...projects];
};

export const getProjectById = async (id) => {
  await delay(150);
  const project = projects.find(project => project.Id === parseInt(id));
  if (!project) {
    throw new Error("Project not found");
  }
  return { ...project };
};

export const createProject = async (projectData) => {
  await delay(300);
  
  // Find the highest existing Id and add 1
  const maxId = projects.length > 0 ? Math.max(...projects.map(project => project.Id)) : 0;
  
  const newProject = {
    Id: maxId + 1,
    ...projectData
  };
  
  projects.push(newProject);
  return { ...newProject };
};

export const updateProject = async (id, projectData) => {
  await delay(250);
  
  const projectIndex = projects.findIndex(project => project.Id === parseInt(id));
  if (projectIndex === -1) {
    throw new Error("Project not found");
  }
  
  const updatedProject = {
    ...projects[projectIndex],
    ...projectData
  };
  
  projects[projectIndex] = updatedProject;
  return { ...updatedProject };
};

export const deleteProject = async (id) => {
  await delay(200);
  
  const projectIndex = projects.findIndex(project => project.Id === parseInt(id));
  if (projectIndex === -1) {
    throw new Error("Project not found");
  }
  
  projects.splice(projectIndex, 1);
  return true;
};