import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://tcs-lime.vercel.app/api/v1",
});

export default apiClient;