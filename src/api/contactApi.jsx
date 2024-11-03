import apiClient from "./apiClient";

export const getContact = async () => {
  const response = await apiClient.get('contact');
  return response.data;
}

export const getContactStatus = async () => {
  const response = await apiClient.get('contactStatus');
  return response.data;
}

export const getContactTypeOfProject = async () => {
  const response = await apiClient.get('contactTypeOfProject');
  return response.data.typeOfProject;
}

export const addContact = async (newContact) => {
  const response = await apiClient.post('addContact', newContact);
  return response.data;
}

export const archiveContact = async (id) => {
  const response = await apiClient.post('archiveContact', { id });
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await apiClient.delete(`deleteContact/${id}`);
  return response.data;
}

export const replyContact = async (replyData) => {
  const response = await apiClient.post('replyContact', replyData);
  return response.data;
};