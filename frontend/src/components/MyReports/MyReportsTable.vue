<template>
  <div style="height: 100%; width: 100%;">
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
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="openUpdateReport(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="openDeleteReport(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-row justify="center">
      <v-dialog v-model="deleteReportModal" max-width="450">
        <delete-report
          v-on:delete="deleteItem"
          @close="deleteReportModal = false"
          :report="currentReport"
        />
      </v-dialog>
      <v-dialog v-model="updateReportModal" max-width="450">
        <update-report
          v-on:save="saveItem"
          :report="currentReport"
          @close="updateReportModal = false"
        />
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import reportService from "../../services/reports.js";
import DeleteReport from "../../components/MyReports/DeleteReport";
import UpdateReport from "../../components/MyReports/UpdateReport";

export default {
  name: "MyReportsTable",
  components: { UpdateReport, DeleteReport },
  data() {
    return {
      headers: [
        { text: "Review", value: "review" },
        { text: "Link", value: "link" },
        { text: "Type", value: "type" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions" }
      ],
      reports: [],
      deleteReportModal: false,
      updateReportModal: false,
      currentReport: {},
      currentIndex: -1
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
    },
    setCurrentReport(item) {
      this.currentReport = Object.assign({}, item);
      this.currentIndex = this.reports.indexOf(item);
    },
    openUpdateReport(item) {
      this.setCurrentReport(item);
      this.updateReportModal = true;
    },
    openDeleteReport(item) {
      this.setCurrentReport(item);
      this.deleteReportModal = true;
    },
    saveItem(data) {
      Object.assign(this.reports[this.currentIndex], data);
      this.updateReportModal = false;
    },
    deleteItem() {
      this.reports.splice(this.currentIndex, 1);
      this.deleteReportModal = false;
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
