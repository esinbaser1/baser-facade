import apiClient from "./apiClient";

// Récupérer les statuts
export const getStatuses = async () => {
  const response = await apiClient.get("status");
  return response.data.statuses || [];
};
