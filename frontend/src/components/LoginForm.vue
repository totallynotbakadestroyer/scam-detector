<template>
  <v-card>
    <v-card-title class="green justify-center">
      <h3 class="py-2">Login</h3>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-text-field v-model="email" type="email" label="Email" />
        <v-text-field v-model="password" type="password" label="Password" />
        <v-divider class="mb-2" />
        Forgot password?
      </v-container>
      <v-card-actions class="justify-end">
        <v-btn @click="$emit('close')">Close</v-btn>
        <v-btn color="primary">Login!</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<style scoped></style>
