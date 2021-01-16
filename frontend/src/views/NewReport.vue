<template>
  <v-card class="d-flex flex-column" width="100%" height="100%">
    <v-card-title>
      New report
    </v-card-title>
    <new-report-form v-on:submit="submit" ref="form" />
    <v-snackbar
      v-model="snackbar"
      :timeout="10000"
      :value="true"
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
import axios from "axios";
import NewReportForm from "../components/NewReport/NewReportForm.vue";

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
    submit(payload) {
      this.$v.$touch();
      this.snackbar = false;
      if (!this.$v.$error) {
        axios({
          method: "post",
          url: "/api/protected/report",
          data: {
            ...payload
          },
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`
          }
        })
          .then(() => {
            this.$refs.form.resetForm();
          })
          .catch(err => {
            this.error = err.response.data.message;
            this.snackbar = true;
          });
      }
    }
  }
};
</script>
