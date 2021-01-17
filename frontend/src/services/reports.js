import axios from "./axiosInstance.js";

const newReport = async payload => {
  return await axios({ requiresAuth: true }).post("/reports", payload);
};
const getUserReports = async () => {
  return await axios({ requiresAuth: true }).get("/reports");
};
const updateReport = async (payload, id) => {
  return await axios({ requiresAuth: true }).put(`/reports/${id}`, payload);
};
const deleteReport = async id => {
  return await axios({ requiresAuth: true }).delete(`/reports/${id}`);
};

export default { newReport, getUserReports, updateReport, deleteReport };
