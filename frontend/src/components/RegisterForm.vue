<template>
  <v-card>
    <v-card-title class="red justify-center">
      <h3 class="py-2">Sign up</h3>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field type="email" label="Email"/>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field type="password" label="Password"/>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field type="password" label="Confirm password"/>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="justify-end">
        <v-btn>Close</v-btn>
        <v-btn color="primary">Sign up!</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RegisterForm"
};
</script>

<style scoped>

</style>
