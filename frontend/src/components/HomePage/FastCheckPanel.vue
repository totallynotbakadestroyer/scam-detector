<template>
  <v-expansion-panel>
    <v-expansion-panel-header hide-actions>
      <h3 class="text-center">Check user</h3>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      Feeling suspicious, huh? Write this user id below and check if that user
      was already reported by someone!
      <v-alert v-if="result" prominent class="text-left" :type="result.type">
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
</template>

<script>
import axios from "axios";
import getFastCheckResults from "../../utils/getFastCheckResults.js";

export default {
  name: "FastCheckPanel",
  data() {
    return {
      userId: "",
      result: ""
    };
  },
  methods: {
    checkUser() {
      axios.get(`/api/users/check/${this.userId}`).then(result => {
        this.result = getFastCheckResults(result, this.userId);
      });
    }
  }
};
</script>
