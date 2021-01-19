<template>
  <v-container class="text-center">
    <div>
      <h5 class="display-3">Welcome to scam-detector!</h5>
    </div>
    <v-divider class="my-4" />
    <div>
      <h6 class="display-1 mb-4">What is scam-detector?</h6>
      <p>
        <strong>Scam-detector</strong> is a simple tool used to check if user is
        already reported as a scammer or report scammer by yourself!
      </p>
    </div>
    <v-expansion-panels accordion>
      <fast-check-panel />
      <login-and-register-panel
        v-on:openLoginForm="loginForm = true"
        v-on:openRegisterForm="registerForm = true"
      />
    </v-expansion-panels>

    <v-row justify="center">
      <v-dialog v-model="loginForm" max-width="450">
        <login-form @close="loginForm = false" />
      </v-dialog>
      <v-dialog v-model="registerForm" max-width="450">
        <register-form @close="registerForm = false" />
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import LoginForm from "../components/LoginFormModal.vue";
import RegisterForm from "../components/RegisterFormModal.vue";
import FastCheckPanel from "../components/HomePage/FastCheckPanel.vue";
import LoginAndRegisterPanel from "../components/HomePage/LoginAndRegisterPanel.vue";

export default {
  name: "Home",
  components: {
    LoginAndRegisterPanel,
    FastCheckPanel,
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      loginForm: false,
      registerForm: false
    };
  }
};
</script>
