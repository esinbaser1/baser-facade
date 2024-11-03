import apiClient from "./apiClient";

export const getInformationContact = async () => {
  const response = await apiClient.get("information");
  return response.data;
}

export const getInformationContactById = async (id) => {
  const response = await apiClient.get(`informationById/${id}`);
  return response.data.information;
}

export const addInformationContact = async (newInformation) => {
  const response = await apiClient.post("addInformation", newInformation); 
  return response.data;
};


export const updateInformationContact = async (updatedInformation) => {
  const response = await apiClient.put("updateInformation", updatedInformation);
  return response.data;
}

export const deleteInformationContact = async (id) => {
  const response = await apiClient.delete(`deleteInformation/${id}`);
  return response.data;
}