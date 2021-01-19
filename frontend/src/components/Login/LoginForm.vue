<template
  ><v-row justify="center">
    <v-col cols="8">
      <div>
        <v-text-field
          v-model="credentials.email"
          outlined
          placeholder="Email"
        />
        <v-text-field
          v-model="credentials.password"
          outlined
          type="password"
          placeholder="Password"
        />
      </div>
      <div class="d-flex justify-space-around">
        <v-btn
          @click="$emit('submit', credentials)"
          color="primary"
          width="35%"
        >
          Login
        </v-btn>
        <v-btn @click="$emit('openSignUp')" color="accent" width="60%">
          Sign up
        </v-btn>
      </div>
      <div class="text-center mt-6">
        Forgot your password?
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "LoginFormStandalone",
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  }
};
</script>
