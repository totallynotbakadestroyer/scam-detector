import axios from "axios";
import store from "../store/index";

export default ({ requiresAuth = false } = {}) => {
  const axiosInstance = axios.create({
    baseURL: "/api"
  });

  if (requiresAuth) {
    axiosInstance.interceptors.request.use(config => {
      const token = store.state.userToken;
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }
  return axiosInstance;
};
