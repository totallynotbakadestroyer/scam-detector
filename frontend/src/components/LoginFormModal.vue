<template>
  <v-card>
    <v-card-title class="green justify-center">
      <h3 class="py-2">Login</h3>
    </v-card-title>
    <v-alert v-if="error" class="mb-0" dismissible type="error">
      {{ error.message }}
    </v-alert>
    <v-card-text>
      <v-text-field v-model="email" type="email" label="Email" />
      <v-text-field v-model="password" type="password" label="Password" />
      <v-divider class="mb-2" />
      Forgot password?
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn @click="$emit('close')">Close</v-btn>
      <v-btn @click="submit" color="primary">Login!</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async submit() {
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped></style>
