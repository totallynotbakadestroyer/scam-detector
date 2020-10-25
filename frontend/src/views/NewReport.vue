<template>
  <v-card class="d-flex flex-column" width="100%" height="100%">
    <v-card-title>
      New report
    </v-card-title>
    <v-card-text class="fill-height">
      <v-row>
        <v-col cols="12">
          <v-text-field
            counter="50"
            label="Report review*"
            placeholder="Briefly describe your report"
            v-model="review"
            :error-messages="reviewErrors"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="website"
            label="Website*"
            :items="websites"
            :error-messages="websiteErrors"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            :error-messages="typeErrors"
            v-model="type"
            label="Type*"
            row
            :items="types"
          >
          </v-select>
        </v-col>
        <v-col cols="12">
          <v-text-field
            placeholder="For example: https://vk.com/baka_destroyer"
            label="Link*"
            v-model="link"
            :error-messages="linkErrors"
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
            v-model="description"
          ></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-file-input
            prepend-icon=""
            multiple
            label="Proofs"
            placeholder="Pictures that will proof allegation"
            v-model="proofs"
          ></v-file-input>
        </v-col>
      </v-row>
      <div id="info">
        <p class="caption float-right mt-auto">
          Fields marked with * are required
        </p>
      </div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn class="mr-2" color="error">Clear Report</v-btn>
      <v-btn @click="submit" class="ml-2" color="primary">Submit Report</v-btn>
    </v-card-actions>
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
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  name: "NewReport",
  mixins: [validationMixin],
  data() {
    return {
      websites: ["vk.com"],
      types: ["user", "group"],
      review: "",
      website: "",
      type: "",
      link: "",
      description: "",
      proofs: [],
      error: "sffs",
      snackbar: false,
    };
  },
  validations: {
    review: {
      required,
      maxLength: maxLength(50),
    },
    website: {
      required,
    },
    type: {
      required,
    },
    link: {
      required,
    },
  },
  computed: {
    reviewErrors() {
      const errors = [];
      if (!this.$v.review.$dirty) {
        return errors;
      }
      if (!this.$v.review.required) {
        errors.push("Review is required");
        return errors;
      }
      if (!this.$v.review.maxLength) {
        errors.push("Review should be less than 50 symbols");
        return errors;
      }
      return errors;
    },
    websiteErrors() {
      const errors = [];
      if (!this.$v.website.$dirty) {
        return errors;
      }
      if (!this.$v.website.required) {
        errors.push("Website is required");
        return errors;
      }
      return errors;
    },
    typeErrors() {
      const errors = [];
      if (!this.$v.type.$dirty) {
        return errors;
      }
      if (!this.$v.type.required) {
        errors.push("Type is required");
        return errors;
      }
      return errors;
    },
    linkErrors() {
      const errors = [];
      if (!this.$v.link.$dirty) {
        return errors;
      }
      if (!this.$v.link.required) {
        errors.push("Link is required");
        return errors;
      }
      return errors;
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      this.snackbar = false;
      if (!this.$v.$error) {
        axios({
          method: "post",
          url: "/api/protected/report",
          data: {
            review: this.review,
            website: this.website,
            type: this.type,
            link: this.link,
            description: this.description,
          },
          headers: {
            Authorization: `Bearer ${this.$store.state.userToken}`,
          },
        })
          .then(() => {
            this.review = "";
            this.website = "";
            this.type = "";
            this.link = "";
            this.description = "";
          })
          .catch((err) => {
            this.error = err.response.data.message;
            this.snackbar = true;
          });
      }
    },
  },
};
</script>
