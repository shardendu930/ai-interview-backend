import api from "../services/api";

export const getAllResumes = async () => {
  const response = await api.get("/resume");
  return response.data;
};

export const createResume = async (data) => {
  const response = await api.post("/resume", data);
  return response.data;
};

export const updateResume = async (id, data) => {
  const response = await api.put(`/resume/${id}`, data);
  return response.data;
};

export const deleteResume = async (id) => {
  const response = await api.delete(`/resume/${id}`);
  return response.data;
};
