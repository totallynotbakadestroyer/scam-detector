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
    <div>
      <v-expansion-panels accordion>
        <v-expansion-panel>
          <v-expansion-panel-header hide-actions>
            <h3 class="text-center">Check user</h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Feeling suspicious, huh? Write this user id below and check if that
            user was already reported by someone!
            <v-alert
              v-if="result"
              prominent
              class="text-left"
              :type="result.type"
            >
              {{ result.text }} You can check the full review
              <a href="#">here</a>
            </v-alert>
            <v-text-field
              class="mt-4"
              color="green"
              label="User id"
              v-model="userId"
              :append-icon="userId ? 'mdi-send' : undefined"
              @click:append="checkUser"
            ></v-text-field>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header hide-actions>
            <h3 class="text-center">Report user</h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            In order to report someone, please
            <a @click.stop="loginForm = true">login</a> using your credentials or
            <a @click.stop="registerForm = true">create</a> a new account.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <v-row justify="center">
      <v-dialog v-model="loginForm" max-width="450">
        <login-form/>
      </v-dialog>
      <v-dialog v-model="registerForm" max-width="450">
        <register-form/>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  name: "Home",
  components: { LoginForm, RegisterForm },
  data() {
    return {
      loginForm: false,
      registerForm: false,
      userId: "",
      result: "",
      resultType: [
        {
          type: "success",
          text:
            "There is nothing bad about this user in our database. Stay cautious anyway!",
        },
        {
          type: "warning",
          text:
            "This user was reported as a potential scammer. However, we can't proof it yet. Stay cautious!",
        },
        {
          type: "error",
          text: "Yep, that is a 100% percent scammer. Stay cautious.",
        },
      ],
    };
  },
  methods: {
    checkUser() {
      axios.get(`/api/users/check/${this.userId}`).then((result) => {
        switch (result.data.status) {
          case "Warning":
            this.result = { ...this.resultType[1], id: this.userId };
            break;
          case "Scammer":
            this.result = { ...this.resultType[2], id: this.userId };
            break;
          default:
            this.result = { ...this.resultType[0], id: this.userId };
            break;
        }
      });
    },
  },
};
</script>
