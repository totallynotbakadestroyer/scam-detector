<template>
  <v-expansion-panel>
    <v-expansion-panel-header hide-actions>
      <h3 class="text-center">Report user</h3>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      In order to report someone, please
      <a @click.stop="$emit('openLoginForm')">login</a> using your credentials
      or <a @click.stop="$emit('openRegisterForm')">create</a> a new account.
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "LoginAndRegisterPanel"
};
</script>

<style scoped></style>
