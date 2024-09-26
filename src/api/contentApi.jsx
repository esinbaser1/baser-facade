import apiClient from "./apiClient";

// Afficher du contenu
export const getContent = async () => {
  const response = await apiClient.get("content");
  return response.data;
};

// Ajouter du contenu
export const addContent = async (newContent) => {
  const response = await apiClient.post("addContent", newContent);
  return response.data;
};

// Récupérer les sections
export const getSections = async () => {
  const response = await apiClient.get("section");
  return response.data.sections || [];
};

// Récupérer les statuts
export const getStatuses = async () => {
  const response = await apiClient.get("status");
  return response.data.statuses || [];
};

// Récupérer un contenu par ID
export const getContentById = async (id) => {
  const response = await apiClient.get(`contentById/${id}`);
  return response.data.content;
};

// Mettre à jour un contenu
export const updateContent = async (updatedContent) => {
  const response = await apiClient.post("updateContent", updatedContent);
  return response.data;
};

// Supprimer du contenu

export const deleteContent = async (id) => {
  const response = await apiClient.post("deleteContent", { id });
  return response.data;
};



// Archiver du contenu