<template>
  <v-card>
    <v-card-title>
      Delete Report
    </v-card-title>
    <v-card-text>
      Are you sure you want to delete your report?
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn @click="$emit('close')">Cancel</v-btn>
      <v-btn @click="deleteItem">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import reportService from "../../services/reports.js";
export default {
  name: "DeleteReport.vue",
  props: ["report"],
  methods: {
    async deleteItem() {
      await reportService.deleteReport(this.report._id);
      this.$emit("delete");
    }
  }
};
</script>

<style scoped></style>
