import apiClient from "./apiClient";

// Récupérer les sections
export const getSections = async () => {
  const response = await apiClient.get("section");
  return response.data.sections || [];
};
