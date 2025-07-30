// Import mock data
import teammatesData from "@/services/mockData/teammates.json";

// In-memory storage for development
let teammates = [...teammatesData];

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllTeammates = async () => {
  await delay(200);
  return [...teammates];
};

export const getTeammateById = async (id) => {
  await delay(150);
  const teammate = teammates.find(teammate => teammate.Id === parseInt(id));
  if (!teammate) {
    throw new Error("Teammate not found");
  }
  return { ...teammate };
};

export const createTeammate = async (teammateData) => {
  await delay(300);
  
  // Find the highest existing Id and add 1
  const maxId = teammates.length > 0 ? Math.max(...teammates.map(teammate => teammate.Id)) : 0;
  
  const newTeammate = {
    Id: maxId + 1,
    ...teammateData
  };
  
  teammates.push(newTeammate);
  return { ...newTeammate };
};

export const updateTeammate = async (id, teammateData) => {
  await delay(250);
  
  const teammateIndex = teammates.findIndex(teammate => teammate.Id === parseInt(id));
  if (teammateIndex === -1) {
    throw new Error("Teammate not found");
  }
  
  const updatedTeammate = {
    ...teammates[teammateIndex],
    ...teammateData
  };
  
  teammates[teammateIndex] = updatedTeammate;
  return { ...updatedTeammate };
};

export const deleteTeammate = async (id) => {
  await delay(200);
  
  const teammateIndex = teammates.findIndex(teammate => teammate.Id === parseInt(id));
  if (teammateIndex === -1) {
    throw new Error("Teammate not found");
  }
  
  teammates.splice(teammateIndex, 1);
  return true;
};