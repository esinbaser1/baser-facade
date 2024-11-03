import apiClient from "./apiClient";

// Afficher du contenu
export const getSocialNetwork = async () => {
  const response = await apiClient.get("socialNetwork");
  return response.data;
};

// Récupérer un contenu par ID
export const getSocialNetworkById = async (id) => {
  const response = await apiClient.get(`socialNetworkById/${id}`);
  return response.data.socialNetwork;
};

// Ajouter du contenu
export const addSocialNetwork = async (newContent) => {
  const response = await apiClient.post("addSocialNetwork", newContent);
  return response.data;
};

// Mettre à jour un contenu
export const updateSocialNetwork = async (updatedContent) => {
  const response = await apiClient.put("updateSocialNetwork", updatedContent);
  return response.data;
};

// Supprimer du contenu
export const deleteSocialNetwork = async (id) => {
  const response = await apiClient.delete(`deleteSocialNetwork/${id}`);
  return response.data;
};


