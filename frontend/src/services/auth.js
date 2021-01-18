import axios from "./axiosInstance.js";

const signIn = async credentials => {
  return await axios().post("/auth/login", credentials);
};

const signUp = async payload => {
  return await axios().post("/auth/signup", payload);
};

export default { signUp, signIn };
