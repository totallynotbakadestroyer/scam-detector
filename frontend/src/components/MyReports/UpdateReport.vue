<template>
  <v-card>
    <v-card-title>
      Report update
    </v-card-title>
    <NewReportForm v-on:submit="update" :payload="report" />
  </v-card>
</template>

<script>
import NewReportForm from "../NewReport/NewReportForm.vue";
import reportService from "../../services/reports.js";
export default {
  name: "UpdateReport.vue",
  components: { NewReportForm },
  props: ["report"],
  methods: {
    async update(payload) {
      const response = await reportService.updateReport(
        payload,
        this.report._id
      );
      this.$emit("save", response.data);
    }
  }
};
</script>

<style scoped></style>
