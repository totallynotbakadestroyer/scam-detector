<template>
  <v-card style="height: 100%; width: 100%;" class="d-flex flex-column">
    <v-card-title>
      My reports
    </v-card-title>
    <v-card-text style="height: 100%;">
      <v-data-table
        :loading="reports.length === 0"
        loading-text="Loading... Please wait"
        style="height: 100%; position: relative;"
        id="table"
        :items="reports"
        :headers="headers"
      >
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)">
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import reportService from "../../services/reports.js";

export default {
  name: "MyReportsTable",
  data() {
    return {
      headers: [
        { text: "Review", value: "review" },
        { text: "Link", value: "link" },
        { text: "Type", value: "type" },
        { text: "Status", value: "status" }
      ],
      reports: []
    };
  },
  methods: {
    getColor(status) {
      switch (status) {
        case "approved":
          return "green";
        case "pending":
          return "orange";
        case "rejected":
          return "red";
        default:
          return undefined;
      }
    }
  },
  async created() {
    const { data } = await reportService.getUserReports();
    this.reports = data;
  }
};
</script>

<style>
#table .v-data-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
