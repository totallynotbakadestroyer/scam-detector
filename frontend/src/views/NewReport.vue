<template>
  <v-card class="d-flex flex-column" width="100%" height="100%">
    <v-card-title>
      New report
    </v-card-title>
    <new-report-form v-on:submit="submit" ref="form" />
    <v-snackbar
      v-model="snackbar"
      :timeout="10000"
      :value="snackbar"
      absolute
      top
      color="error"
    >
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import NewReportForm from "../components/NewReport/NewReportForm.vue";
import reportService from "../services/reports.js";

export default {
  name: "NewReport",
  components: { NewReportForm },
  data() {
    return {
      error: "",
      snackbar: false
    };
  },
  methods: {
    async submit(payload) {
      try {
        this.snackbar = false;
        await reportService.newReport(payload);
        await this.$router.push("/my-reports");
      } catch (error) {
        this.error = error;
        this.snackbar = true;
      }
    }
  }
};
</script>
