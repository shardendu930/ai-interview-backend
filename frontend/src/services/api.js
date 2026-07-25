import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-interview-backend-p740.onrender.com/api",
  withCredentials: true,
});

export default api;
