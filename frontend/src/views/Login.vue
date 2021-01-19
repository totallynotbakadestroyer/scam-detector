<template>
  <v-row
    class="fill-height"
    justify="center"
    align-content="center"
    align="center"
  >
    <v-col cols="4">
      <v-card>
        <v-card-title>
          Scam-detector Login
        </v-card-title>
        <v-card-text>
          <v-alert :type="alert.type">
            {{ alert.message }}
          </v-alert>
          <login-form-standalone
            v-on:openSignUp="registerForm = true"
            v-on:submit="login"
          />
        </v-card-text>
      </v-card>
    </v-col>
    <v-dialog v-model="registerForm" max-width="450">
      <register-form @close="registerForm = false" />
    </v-dialog>
  </v-row>
</template>

<script>
import LoginFormStandalone from "../components/Login/LoginForm.vue";
import RegisterForm from "../components/RegisterFormModal.vue";

export default {
  name: "Login",
  components: { RegisterForm, LoginFormStandalone },
  data() {
    return {
      registerForm: false,
      alert: {
        type: "info",
        message: "Please log in or sign up to view this page."
      }
    };
  },
  methods: {
    async login(credentials) {
      try {
        await this.$store.dispatch("login", credentials);
      } catch (e) {
        console.log(e);
        this.alert = { type: "error", message: e.message };
      }
    }
  }
};
</script>

<style scoped></style>
