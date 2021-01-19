<template>
  <v-card>
    <v-window v-model="step">
      <v-card-title class="blue justify-center">
        <h3 class="py-2">Sign up</h3>
      </v-card-title>
      <v-window-item :value="1">
        <v-alert v-if="error" class="mb-0" dismissible type="error"
          >{{ error.message }}
        </v-alert>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="username"
                label="Username"
                :error-messages="usernameErrors"
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                type="email"
                label="Email"
                :error-messages="emailErrors"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="password"
                type="password"
                label="Password"
                :error-messages="passwordErrors"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="passwordRepeat"
                type="password"
                label="Repeat password"
                :error-messages="passwordRepeatErrors"
                @input="$v.passwordRepeat.$touch()"
                @blur="$v.passwordRepeat.$touch()"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn @click="$emit('close')">Close</v-btn>
          <v-btn :disabled="$v.$error" @click="submit" color="primary"
            >Sign up!</v-btn
          >
        </v-card-actions>
      </v-window-item>
      <v-window-item :value="2">
        <v-card-text class="text-center">
          Congratulations! Registration is completed. There should be an email
          confirmation but this feature is not implemented yet! So just login
          using your credentials you used during registration
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn @click="$emit('close')" large color="primary">Close</v-btn>
        </v-card-actions>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import axios from "axios";

export default {
  mixins: [validationMixin],
  name: "RegisterForm",
  data() {
    return {
      error: "",
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      step: 1
    };
  },
  validations: {
    username: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    passwordRepeat: {
      required,
      sameAsPassword: sameAs("password")
    }
  },
  created() {
    this.$v.$touch();
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) {
        return errors;
      }
      if (!this.$v.username.required) {
        errors.push("Username is required");
        return errors;
      }
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) {
        return errors;
      }
      if (!this.$v.email.required) {
        errors.push("Email is required");
        return errors;
      }
      if (!this.$v.email.email) {
        errors.push("Email is invalid");
        return errors;
      }
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) {
        return errors;
      }
      if (!this.$v.password.required) {
        errors.push("Password is required");
        return errors;
      }
      if (!this.$v.password.minLength) {
        errors.push("Password must be at least 6 symbols long");
        return errors;
      }
      return errors;
    },
    passwordRepeatErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) {
        return errors;
      }
      if (!this.$v.password.required) {
        errors.push("You must to confirm your password");
        return errors;
      }
      if (!this.$v.passwordRepeat.sameAsPassword) {
        errors.push("Passwords must be identical");
        return errors;
      }
      return errors;
    }
  },
  methods: {
    submit() {
      this.error = "";
      this.$v.$touch();
      if (!this.$v.$error) {
        axios
          .post("/api/users/signup", {
            username: this.username,
            email: this.email,
            password: this.password
          })
          .then(result => {
            console.log(result);
            this.step = 2;
          })
          .catch(err => {
            console.log(err.response.data);
            this.error =
              err.response.data.error !== undefined
                ? err.response.data.error
                : err.response.data;
          });
      }
    }
  }
};
</script>

<style scoped></style>
