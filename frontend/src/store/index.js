import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userToken: "",
    userInfo: "",
    status: ""
  },
  mutations: {
    authRequest(state) {
      state.status = "loading";
    },
    authSuccess(state, loginInfo) {
      state.status = "logged";
      state.userToken = loginInfo.token;
      state.userInfo = loginInfo.userInfo;
    },
    authError(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.userToken = "";
      state.userInfo = "";
      localStorage.removeItem("token");
    }
  },
  actions: {
    login({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        commit("authRequest");
        axios
          .post("/api/users/login", { email, password })
          .then(response => {
            const token = response.headers.authorization.split(" ")[1];
            localStorage.setItem("token", token);
            const userInfo = response.data;
            commit("authSuccess", { token, userInfo });
            resolve();
          })
          .catch(error => {
            console.log(error);
            commit("authError");
            reject(error);
          });
      });
    }
  }
});
