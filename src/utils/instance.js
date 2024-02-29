import axios from "axios";

const djangoApi = "http://localhost:8000";
const axiosInstance = axios.create({
  baseURL: `${djangoApi}/api/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
