import Vue from "vue";
import Vuex from "vuex";
import authService from "../services/auth";
import router from "../router";

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
    async login({ commit }, { email, password }) {
      commit("authRequest");
      try {
        const response = await authService.signIn({ email, password });
        const token = response.headers.authorization.split(" ")[1];
        localStorage.setItem("token", token);
        const userInfo = response.data;
        commit("authSuccess", { token, userInfo });
        await router.push("/report");
      } catch (e) {
        console.log(e);
        commit("authError");
      }
    }
  }
});
