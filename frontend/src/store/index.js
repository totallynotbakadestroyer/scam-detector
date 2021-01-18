import Vue from "vue";
import Vuex from "vuex";
import authService from "../services/auth";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userToken: "",
    username: "",
    status: ""
  },
  mutations: {
    authRequest(state) {
      state.status = "loading";
    },
    authSuccess(state, loginInfo) {
      state.status = "logged";
      state.userToken = loginInfo.token;
      state.username = loginInfo.username;
    },
    authError(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.userToken = "";
      state.username = "";
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
        const username = response.data.username;
        commit("authSuccess", { token, username });
        await router.push("/report");
      } catch (e) {
        console.log(e);
        commit("authError");
      }
    }
  }
});
