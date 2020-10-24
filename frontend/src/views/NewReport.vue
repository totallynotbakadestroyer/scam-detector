<template>
  <v-card
    class="d-flex flex-column"
    style="height: 100%; width: 100%;"
  >
    <v-card-title>
      New report
    </v-card-title>
    <v-card-text style="height: 100%;">
      <v-row>
        <v-col cols="12">
          <v-text-field
            counter="50"
            label="Report reason"
            placeholder="Briefly describe your report"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select label="Website" :items="websites"></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select label="Type" row :items="types"> </v-select>
        </v-col>
        <v-col cols="12">
          <v-text-field
            placeholder="For example: https://vk.com/baka_destroyer"
            label="Link"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            placeholder="Explain why we should add this user/group to our database"
            auto-grow
            clearable
            rows="2"
            label="Description"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-file-input
            prepend-icon=""
            multiple
            label="Proofs"
            placeholder="Pictures that will proof allegation"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn class="mr-2" color="error">Clear Report</v-btn>
      <v-btn class="ml-2" color="primary">Submit Report</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "NewReport",
  data() {
    return {
      websites: ["vk.com"],
      types: ["user", "group"],
    };
  },
};
</script>
