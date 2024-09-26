import apiClient from "./apiClient";

export const checkAdminAccess = async () => {
  const response = await apiClient.post("admin"); 
  return response.data; 
};