import apiClient from "./apiClient";

export const getImage = async () => {
  const response = await apiClient.get("image");
  return response.data;
}

export const addImage = async (formData) => {
  const response = await apiClient.post("addImage", formData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    }
  })
  return response.data;
};

export const getImageById = async (id) => {
  const response = await apiClient.get(`imageById/${id}`); 
  return response.data.images;
};

export const updateImage = async (updatedImage) => {
  const response = await apiClient.post("updateImage", updatedImage, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });
  return response.data;
};

export const deleteImage = async (id) => {
  const response = await apiClient.post("deleteImage", { id });
  return response.data;
};
